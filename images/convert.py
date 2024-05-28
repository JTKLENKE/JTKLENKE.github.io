import os
from PIL import Image


def convert_images_to_webp(input_directory, output_directories):
    for output_directory in output_directories.values():
        os.makedirs(output_directory, exist_ok=True)

    counts = {key: 1 for key in output_directories.keys()}
    for root, _, files in os.walk(input_directory):
        for file in files:
            if file.lower().endswith(".jpg"):
                jpg_path = os.path.join(root, file)

                with Image.open(jpg_path) as img:
                    aspect = img.width / img.height
                    if aspect < 1:
                        img_type = "portrait"
                    elif aspect < 2:
                        img_type = "landscape"
                    else:
                        img_type = "wide"

                    webp_path = os.path.join(
                        output_directories[img_type], f"{counts[img_type]}.webp"
                    )
                    img.save(webp_path, "webp")
                counts[img_type] += 1


if __name__ == "__main__":
    output_directories = {
        "landscape": "images/photos/landscape",
        "portrait": "images/photos/portrait",
        "wide": "images/photos/wide",
    }
    input_directory = "images/photography/"

    convert_images_to_webp(input_directory, output_directories)
