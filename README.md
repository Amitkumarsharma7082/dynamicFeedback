# Dynamic Feedback Widget

A beautiful, customizable feedback widget that can be embedded into any website, along with an admin dashboard for managing feedback questions and analyzing responses.

## Features

- **Feedback Widget**: A floating button that opens a popup with custom questions
- **Multiple Question Types**: Support for Yes/No, Rating Scale, and Open Text responses
- **Admin Dashboard**: Create, edit, and publish questions
- **Analytics**: View response data and trends
- **Customizable**: Easily adjust colors, position, and text

## Demo Credentials

- **Email**: admin@example.com
- **Password**: password

## Running the Project

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn

### Installation

1. Clone the repository

   ```
   git clone <repository-url>
   cd dynamic-feedback-widget
   ```

2. Install dependencies

   ```
   npm install
   ```

3. Start the development server

   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:8080`

## Using the Widget

The feedback widget is embedded on the index page for demonstration. In a real-world scenario, you would:

1. Build the widget as a standalone script
2. Include it in your website using a script tag:

```html
<script src="https://feedback-widget.example.com/widget.js"></script>
<script>
  window.FeedbackWidget.init({
    position: "bottom-right",
    buttonText: "Feedback",
    primaryColor: "#0071e3",
  });
</script>
```

## Customization Options

The feedback widget supports the following configuration options:

- `position`: Position of the button ('bottom-right', 'bottom-left', 'top-right', 'top-left')
- `primaryColor`: Main color of the button and UI elements
- `textColor`: Color of the text on the button
- `buttonText`: Text displayed on the feedback button
- `thankYouMessage`: Message shown after submitting feedback

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Router
- React Query

## Notes

This project uses a mock implementation for demonstration purposes. In a production environment, you would:

1. Implement a real backend API (Node.js, Firebase, etc.)
2. Connect to a proper database (PostgreSQL, MongoDB, Firebase Firestore, etc.)
3. Set up proper authentication and security
4. Create a build process for the standalone widget script
