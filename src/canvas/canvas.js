// import imagesLoaded from "imagesloaded";
// import { Canvas as GlslCanvas } from "glsl-canvas-js";

// export function setupCanvases(fragShader) {
//     const divs = document.querySelectorAll("div.shader");

//     divs.forEach((div) => {
//         const img = div.querySelector("img");

//         imagesLoaded(img, function () {
//             const canvas = document.createElement("canvas");
//             const sandbox = new GlslCanvas(canvas);

//             div.appendChild(canvas);
//             div.classList.add("loaded");

//             function sizer() {
//                 const w = img.clientWidth + 200;
//                 const h = img.clientHeight + 200;
//                 const dpi = window.devicePixelRatio;

//                 canvas.width = w * dpi;
//                 canvas.height = h * dpi;
//                 canvas.style.width = w + "px";
//                 canvas.style.height = h + "px";

//                 sandbox.setUniform("dpi", dpi);
//             }

//             let currentStrength = 1;
//             let aimStrength = 1;

//             sandbox.load(fragShader);
//             sandbox.setUniform("image", img.currentSrc);
//             sandbox.setUniform("strength", currentStrength);

//             sizer();
//             window.addEventListener("resize", function () {
//                 sizer();
//             });

//             const observer = new IntersectionObserver(
//                 (entries) => {
//                     entries.forEach((entry) => {
//                         if (entry.intersectionRatio > 0) {
//                             aimStrength = 0;

//                         } else {
//                             aimStrength = 1;
//                         }
//                     });
//                 },
//                 { threshold: [0.0, 0.01, 1.0] }
//             );
//             observer.observe(img);

//             const animate = () => {
//                 const diff = aimStrength - currentStrength;
//                 currentStrength += diff * 0.02;
//                 sandbox.setUniform("strength", currentStrength);

//                 requestAnimationFrame(animate);
//             };
//             animate();
//         });
//     });
// }
import imagesLoaded from "imagesloaded";
import { Canvas as GlslCanvas } from "glsl-canvas-js";

export function setupCanvases(fragShader) {
    const divs = document.querySelectorAll("div.shader");

    divs.forEach((div) => {
        const img = div.querySelector("img");

        imagesLoaded(img, function () {
            const canvas = document.createElement("canvas");
            const sandbox = new GlslCanvas(canvas);

            div.appendChild(canvas);
            div.classList.add("loaded");

            function sizer() {
                const w = img.clientWidth + 200;
                const h = img.clientHeight + 200;
                const dpi = window.devicePixelRatio;

                canvas.width = w * dpi;
                canvas.height = h * dpi;
                canvas.style.width = w + "px";
                canvas.style.height = h + "px";

                sandbox.setUniform("dpi", dpi);
            }

            let currentStrength = 1;
            let aimStrength = 1;

            sandbox.load(fragShader);
            sandbox.setUniform("image", img.currentSrc);
            sandbox.setUniform("strength", currentStrength);

            sizer();
            window.addEventListener("resize", function () {
                sizer();
            });

            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.intersectionRatio > 0) {
                            aimStrength = 0;
                        } else {
                            aimStrength = 1;
                        }
                    });
                },
                { threshold: [0.0, 0.01, 1.0] }
            );
            observer.observe(img);

            // Mouse event handling
            canvas.addEventListener("mousemove", (event) => {
                const rect = canvas.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;

                // Adjust aimStrength based on mouse position
                // For example, you could make the effect stronger when the mouse is near the center
                const centerX = canvas.width / 2;
                const centerY = canvas.height / 2;
                const distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
                aimStrength = Math.max(0, 1 - distance / (canvas.width / 2)); // Normalize to 0-1 based on distance
            });

            // Reset strength when mouse leaves
            canvas.addEventListener("mouseleave", () => {
                aimStrength = 1; // Reset to default when mouse leaves
            });

            const animate = () => {
                const diff = aimStrength - currentStrength;
                currentStrength += diff * 0.02;
                sandbox.setUniform("strength", currentStrength);

                requestAnimationFrame(animate);
            };
            animate();

        });
    });
}
