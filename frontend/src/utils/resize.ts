export function resize(imageFile: File) {
    return new Promise<File>((resolve, reject) => {
        const image = new Image();

        image.onload = () => {
            try {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                canvas.width = image.width;
                canvas.height = image.height;
                ctx!.drawImage(image, 0, 0, image.width, image.height);

                // Reduce the quality to 40%
                const quality = 0.4;
                const resizedDataUrl = canvas.toDataURL(imageFile.type, quality);

                // Convert the data URL to a Blob
                const byteString = atob(resizedDataUrl.split(",")[1]);
                const mimeString = resizedDataUrl
                    .split(",")[0]
                    .split(":")[1]
                    .split(";")[0];
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const resizedBlob = new Blob([ab], { type: mimeString });

                // Create a new File object from the resized Blob
                const resizedFile = new File([resizedBlob], imageFile.name, {
                    type: imageFile.type,
                    lastModified: Date.now(),
                });

                resolve(resizedFile);
            } catch (e) {
                reject(e);
            }
        };

        image.onerror = (error) => {
            reject(new Error(`Failed to load image: ${error}`));
        };

        image.src = URL.createObjectURL(imageFile);
    })
}


