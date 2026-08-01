/**
 * Planet — вращающаяся 3D планета с кольцом на Three.js
 * Встраивается в nav-logo, следит за курсором, реагирует на ховер
 */
import * as THREE from 'three';

export function initPlanet() {
    const canvas = document.getElementById('planetCanvas');
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
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    // ===== Планета (сфера с процедурной текстурой) =====
    const planetGeometry = new THREE.SphereGeometry(0.85, 64, 64);

    // Создаём canvas-текстуру для планеты
    const texCanvas = document.createElement('canvas');
    texCanvas.width = 512;
    texCanvas.height = 512;
    const ctx = texCanvas.getContext('2d');

    // Рисуем процедурную текстуру планеты
    function drawPlanetTexture() {
        ctx.clearRect(0, 0, 512, 512);

        // Базовый градиент — темно-зеленый фон
        const bgGrad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
        bgGrad.addColorStop(0, '#0a3d0a');
        bgGrad.addColorStop(0.5, '#072007');
        bgGrad.addColorStop(1, '#030a03');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, 512, 512);

        // Рисуем "материки" — пятна разных оттенков зелёного
        const continentColors = [
            '#00ff41', '#39ff14', '#00cc33',
            '#1aff1a', '#00e639', '#00ff55',
            '#33ff33', '#00ff4a', '#00dd33'
        ];

        // Большие материки
        for (let i = 0; i < 8; i++) {
            const cx = Math.random() * 512;
            const cy = Math.random() * 512;
            const radius = 40 + Math.random() * 100;
            const color = continentColors[Math.floor(Math.random() * continentColors.length)];

            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            grad.addColorStop(0, color);
            grad.addColorStop(0.4, color + '80');
            grad.addColorStop(0.7, '#00ff41' + '20');
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Маленькие острова
        for (let i = 0; i < 30; i++) {
            const cx = Math.random() * 512;
            const cy = Math.random() * 512;
            const radius = 5 + Math.random() * 20;
            const color = continentColors[Math.floor(Math.random() * continentColors.length)];

            const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            grad.addColorStop(0, color);
            grad.addColorStop(0.6, color + '60');
            grad.addColorStop(1, 'transparent');

            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(cx, cy, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Добавляем шум/кратеры
        for (let i = 0; i < 200; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const r = 1 + Math.random() * 4;
            const alpha = 0.1 + Math.random() * 0.2;
            ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Яркие точки свечения
        for (let i = 0; i < 15; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const r = 3 + Math.random() * 10;
            const grad = ctx.createRadialGradient(x, y, 0, x, y, r);
            grad.addColorStop(0, 'rgba(57, 255, 20, 0.15)');
            grad.addColorStop(1, 'transparent');
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    drawPlanetTexture();

    const texture = new THREE.CanvasTexture(texCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);

    const planetMaterial = new THREE.MeshStandardMaterial({
        map: texture,
        roughness: 0.4,
        metalness: 0.1,
        emissive: new THREE.Color('#00ff41'),
        emissiveIntensity: 0.08,
    });

    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    scene.add(planet);

    // ===== Атмосферное свечение (glow) =====
    const glowGeometry = new THREE.SphereGeometry(0.92, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: '#00ff41',
        transparent: true,
        opacity: 0.08,
        side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // ===== Кольцо =====
    const ringGeometry = new THREE.TorusGeometry(1.45, 0.045, 32, 100);
    const ringMaterial = new THREE.MeshStandardMaterial({
        color: '#00ff41',
        emissive: '#39ff14',
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.55,
        side: THREE.DoubleSide,
        roughness: 0.3,
        metalness: 0.2,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI * 0.35;
    ring.rotation.z = Math.PI * 0.1;
    scene.add(ring);

    // Внутреннее кольцо (тоньше, ярче)
    const ringInnerGeometry = new THREE.TorusGeometry(1.25, 0.015, 24, 80);
    const ringInnerMaterial = new THREE.MeshBasicMaterial({
        color: '#39ff14',
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide,
    });
    const ringInner = new THREE.Mesh(ringInnerGeometry, ringInnerMaterial);
    ringInner.rotation.x = Math.PI * 0.35;
    ringInner.rotation.z = Math.PI * 0.1;
    scene.add(ringInner);

    // ===== Освещение =====
    const ambientLight = new THREE.AmbientLight(0x224422, 0.6);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0x00ff41, 1.5);
    mainLight.position.set(2, 3, 4);
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0x39ff14, 0.8);
    fillLight.position.set(-3, -1, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x00ff41, 0.5);
    rimLight.position.set(0, -2, -3);
    scene.add(rimLight);

    // ===== Звёзды (фон) =====
    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
        starPositions[i] = (Math.random() - 0.5) * 20;
    }
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starsMaterial = new THREE.PointsMaterial({
        color: '#00ff41',
        size: 0.02,
        transparent: true,
        opacity: 0.4,
    });
    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // ===== Состояние =====
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isHovering = false;
    let targetRotationSpeed = 0.005;
    let currentRotationSpeed = 0.005;
    let targetGlowIntensity = 0.08;
    let currentGlowIntensity = 0.08;

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
        targetRotationSpeed = 0.025;
        targetGlowIntensity = 0.25;
    });

    container.addEventListener('mouseleave', () => {
        isHovering = false;
        targetRotationSpeed = 0.005;
        targetGlowIntensity = 0.08;
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
        currentGlowIntensity += (targetGlowIntensity - currentGlowIntensity) * 0.08;

        // Вращение планеты
        planet.rotation.y += currentRotationSpeed;
        planet.rotation.x = Math.sin(Date.now() * 0.0003) * 0.05 + currentY * 0.3;
        planet.rotation.z = currentX * 0.2;

        // Вращение кольца (медленнее)
        ring.rotation.y += currentRotationSpeed * 0.6;
        ringInner.rotation.y += currentRotationSpeed * 0.6;

        // Параллакс-наклон
        ring.rotation.x = Math.PI * 0.35 + currentY * 0.1;
        ring.rotation.z = Math.PI * 0.1 + currentX * 0.15;

        ringInner.rotation.x = Math.PI * 0.35 + currentY * 0.1;
        ringInner.rotation.z = Math.PI * 0.1 + currentX * 0.15;

        // Свечение (интенсивность)
        glow.material.opacity = currentGlowIntensity;

        // Планета пульсирует glow emission
        planetMaterial.emissiveIntensity = 0.05 + Math.sin(Date.now() * 0.001) * 0.03 + currentGlowIntensity * 0.7;

        // Звёзды медленно вращаются
        stars.rotation.y += 0.0005;

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