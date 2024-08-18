# Virtual Try-On Platform

Welcome to the Virtual Try-On Platform! This project allows users to visualize how clothing will look on them by using advanced face-swapping technology. It captures an image of the user’s face and seamlessly swaps it with the face of a fashion model wearing the selected clothing. This project leverages the power of machine learning with a Hugging Face model called `inswapper` and is built with a modern tech stack.

## Features

- **Face Swapping:** Accurately swaps the user's face with that of a fashion model to give a realistic preview of how the clothing will look.
- **User Authentication:** Secure user authentication powered by Clerk.
- **Frontend:** Built with React, Tailwind CSS, and Vite for a fast and responsive user experience.
- **Backend:** Python-based server using Flask, handling image processing and face swapping.
- **Extensible:** Future plans include integrating AR/VR technology for an immersive experience that can extend beyond fashion to furniture and other items.

## Screenshots

### Full Page UI
![Screenshot 2024-08-18 at 3 52 49 PM](https://github.com/user-attachments/assets/3865ef16-528a-4754-a8d7-e3f2808912ce)
<br></br>
![Screenshot 2024-08-18 at 3 53 06 PM](https://github.com/user-attachments/assets/6b7c005f-ee0e-441d-ade1-c5c3877ce681)

### Detailed UI Components

<img width="1435" alt="Screenshot 2024-08-18 at 3 57 32 PM" src="https://github.com/user-attachments/assets/6e2e132d-be96-4290-8997-50c0f9db019d">
<img width="1408" alt="Screenshot 2024-08-18 at 3 58 12 PM" src="https://github.com/user-attachments/assets/adc52fa2-2ebf-4ba5-98c5-b38fdda34cfb">

## Tech Stack

- **Frontend:** React + Tailwind CSS + Vite
- **Backend:** Flask (Python)
- **Authentication:** Clerk
- **Machine Learning Model:** `inswapper` (Hugging Face)

## Installation

### Backend Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```
2. Navigate to the `roop/roop` directory:
    ```bash
    cd roop/roop
    ```
3. Install the required Python packages:
    ```bash
    pip install -r requirements.txt
    ```
4. Run the Flask server:
    ```bash
    python server.py
    ```

### Frontend Setup

1. Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2. Install the necessary dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```

## Usage

1. Sign in using your credentials (handled by Clerk).
2. Select the clothing item you want to try on.
3. Upload your image with a full face view.
4. The platform will process the images and display the result with your face swapped onto the model.

## Future Scope

- **AR/VR Integration:** Extend the platform to include AR/VR capabilities, allowing users to visualize not only clothing but also furniture, accessories, and more in a 3D environment.
- **Expanded Item Visualization:** Enhance the platform to include a wide range of items, offering a comprehensive virtual shopping experience.

## Contributing

Contributions are welcome! If you have ideas for improving the platform or adding new features, feel free to fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
