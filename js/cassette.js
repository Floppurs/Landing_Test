/**
 * Cassette — 3D музыкальная кассета на Three.js
 * Встраивается в nav-logo на странице плеера, наклонена под 45°,
 * следит за курсором, реагирует на ховер
 */
import * as THREE from 'three';

export function initCassette() {
    const canvas = document.getElementById('cassetteCanvas');
    const container = document.getElementById('navLogo');
    if (!canvas || !container) return;

    // ===== Размеры =====
    const size = container.clientWidth || 200;

    canvas.width = size;
    canvas.height = size;

    // ===== Scene, Camera, Renderer =====
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0.5, 4.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
    });
    renderer.setSize(size, size);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ===== Группа кассеты (для наклона 45°) =====
    const cassetteGroup = new THREE.Group();
    // YXZ порядок: сначала глобальная вертикаль (Y), потом параллакс (X), потом наклон 45° (Z)
    cassetteGroup.rotation.set(0, 0, Math.PI / 4, 'YXZ');
    scene.add(cassetteGroup);

    // ===== Корпус кассеты =====
    const bodyGeometry = new THREE.BoxGeometry(2.2, 1.4, 0.35);
    const bodyMaterial = new THREE.MeshBasicMaterial({
        color: '#2d2a26',
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    cassetteGroup.add(body);

    // Верхняя крышка (чуть светлее, с фаской-имитацией)
    const lidGeometry = new THREE.BoxGeometry(2.2, 0.18, 0.38);
    const lidMaterial = new THREE.MeshBasicMaterial({
        color: '#3a3630',
    });
    const lid = new THREE.Mesh(lidGeometry, lidMaterial);
    lid.position.y = 0.72;
    cassetteGroup.add(lid);

    // Нижняя часть корпуса
    const bottomGeometry = new THREE.BoxGeometry(2.2, 0.18, 0.38);
    const bottomMaterial = new THREE.MeshBasicMaterial({
        color: '#24211d',
    });
    const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
    bottom.position.y = -0.72;
    cassetteGroup.add(bottom);

    // ===== Детали обеих сторон кассеты =====
    function addFaceDetails(z) {
        const dir = Math.sign(z); // 1 — лицевая сторона, -1 — задняя

        // Катушки (цилиндры) — с блеском
        const reelGeometry = new THREE.CylinderGeometry(0.42, 0.42, 0.12, 48);
        const reelMaterial = new THREE.MeshStandardMaterial({
            color: '#8a9a7b',
            roughness: 0.2,
            metalness: 0.6,
        });

        const reelLeft = new THREE.Mesh(reelGeometry, reelMaterial);
        reelLeft.position.set(-0.55, 0, z);
        reelLeft.rotation.x = Math.PI / 2;
        cassetteGroup.add(reelLeft);

        const reelRight = new THREE.Mesh(reelGeometry, reelMaterial);
        reelRight.position.set(0.55, 0, z);
        reelRight.rotation.x = Math.PI / 2;
        cassetteGroup.add(reelRight);

        // Втулки катушек (внутренние отверстия) — с блеском
        const hubGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.14, 32);
        const hubMaterial = new THREE.MeshStandardMaterial({
            color: '#2d2a26',
            roughness: 0.25,
            metalness: 0.7,
        });

        const hubLeft = new THREE.Mesh(hubGeometry, hubMaterial);
        hubLeft.position.set(-0.55, 0, z);
        hubLeft.rotation.x = Math.PI / 2;
        cassetteGroup.add(hubLeft);

        const hubRight = new THREE.Mesh(hubGeometry, hubMaterial);
        hubRight.position.set(0.55, 0, z);
        hubRight.rotation.x = Math.PI / 2;
        cassetteGroup.add(hubRight);

        // Окно кассеты (прозрачная вставка) — чуть ближе к центру корпуса
        const windowGeometry = new THREE.BoxGeometry(1.7, 0.5, 0.02);
        const windowMaterial = new THREE.MeshBasicMaterial({
            color: '#8a9a7b',
            transparent: true,
            opacity: 0.25,
        });
        const cassetteWindow = new THREE.Mesh(windowGeometry, windowMaterial);
        cassetteWindow.position.set(0, 0, z - dir * 0.01);
        cassetteGroup.add(cassetteWindow);

        // Лента между катушками — чуть дальше от центра корпуса
        const tapeGeometry = new THREE.BoxGeometry(1.1, 0.06, 0.02);
        const tapeMaterial = new THREE.MeshBasicMaterial({
            color: '#6b6459',
        });
        const tape = new THREE.Mesh(tapeGeometry, tapeMaterial);
        tape.position.set(0, 0, z + dir * 0.01);
        cassetteGroup.add(tape);
    }

    // Лицевая сторона
    addFaceDetails(0.2);
    // Задняя сторона
    addFaceDetails(-0.2);

    // ===== Простое равномерное освещение (без теней) =====
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(2, 3, 4);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xa8b89a, 0.4);
    fillLight.position.set(-3, -1, 2);
    scene.add(fillLight);

    // ===== Состояние =====
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;
    let targetRotationSpeed = 0.02;
    let currentRotationSpeed = 0.02;
    let targetGlowIntensity = 0.15;
    let currentGlowIntensity = 0.15;

    // Накопленный угол вращения вокруг глобальной вертикальной оси
    let verticalRotation = 0;

    // Сохраняем начальный наклон 45° по Z
    const baseTiltZ = Math.PI / 4;

    // ===== События мыши =====
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX = x * 0.5;
        mouseY = y * 0.3;
    });

    container.addEventListener('mouseenter', () => {
        isHovering = true;
        targetRotationSpeed = 0.08;
        targetGlowIntensity = 0.4;
    });

    container.addEventListener('mouseleave', () => {
        isHovering = false;
        targetRotationSpeed = 0.02;
        targetGlowIntensity = 0.15;
        mouseX = 0;
        mouseY = 0;
    });

    // ===== Анимация =====
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);

        const delta = clock.getDelta();

        // Плавное следование за мышью
        currentX += (mouseX - currentX) * 0.08;
        currentY += (mouseY - currentY) * 0.08;

        // Плавное изменение скорости вращения
        currentRotationSpeed += (targetRotationSpeed - currentRotationSpeed) * 0.08;

        // Накопление угла вращения вокруг глобальной вертикальной оси
        verticalRotation += currentRotationSpeed;

        // Глобальное вращение вокруг вертикальной оси + параллакс
        // Порядок установки: Y (вращение) → X (параллакс) → Z (наклон)
        cassetteGroup.rotation.y = verticalRotation + currentX * 0.4;
        cassetteGroup.rotation.x = currentY * 0.3;
        // Z остаётся фиксированным (45°)

        renderer.render(scene, camera);
    }

    animate();

    // ===== Resize handler =====
    function handleResize() {
        const s = container.clientWidth || 200;
        canvas.width = s;
        canvas.height = s;
        renderer.setSize(s, s);
    }

    window.addEventListener('resize', handleResize);

    // Возвращаем cleanup
    return () => {
        window.removeEventListener('resize', handleResize);
        scene.traverse((obj) => {
            if (obj.isMesh) {
                obj.geometry.dispose();
                if (Array.isArray(obj.material)) {
                    obj.material.forEach((m) => m.dispose());
                } else {
                    obj.material.dispose();
                }
            }
        });
        renderer.dispose();
    };
}