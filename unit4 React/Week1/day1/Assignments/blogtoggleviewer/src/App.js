import React, { useState } from 'react';
import './App.css';

const blogs = [
  {
    title: "Mastering JavaScript",
    content: `JavaScript is a powerful language for web development. It allows developers to create dynamic and interactive web experiences. 
    
From ES6 features like arrow functions, promises, and destructuring, to advanced concepts such as closures, async/await, and prototypal inheritance, mastering JavaScript opens doors to building scalable front-end and back-end applications using frameworks like React, Node.js, and Express. Whether you're working on single-page applications or server-side APIs, JavaScript plays a central role in modern web development.`
  },
  {
    title: "React in Indian Startups",
    content: `React is widely used in many Indian tech companies, from early-stage startups to unicorns. Its component-based architecture, performance benefits with virtual DOM, and vast ecosystem make it a top choice for building scalable user interfaces.

Startups like Swiggy, Zomato, Razorpay, and Meesho rely heavily on React for their web platforms. With the rise of remote and product-based companies in India, the demand for React developers has grown significantly. Its integration with tools like Redux, React Query, and Next.js helps in building feature-rich products faster.`
  },
  {
    title: "Career in Web Development",
    content: `Explore job roles and growth in web development. Web development offers a diverse career path, ranging from front-end roles focusing on user interfaces to back-end roles that manage server logic and databases.

In India, web developers are in high demand across tech hubs like Bengaluru, Hyderabad, and Pune. Entry-level roles such as Web Developer or UI Developer can quickly grow into Full Stack Developer, Tech Lead, or Product Engineer positions. Strong knowledge of HTML, CSS, JavaScript, and frameworks like React or Angular is essential, along with backend skills in Node.js, Python, or Java.`
  },
  {
    title: "Importance of Responsive Design",
    content: `Responsive design ensures your web application works seamlessly across devices—desktops, tablets, and mobile phones. With the increase in mobile users globally, it's crucial to build flexible layouts using media queries, flexible grids, and responsive images.

Tools like CSS Flexbox, Grid, and frameworks like Bootstrap or Tailwind CSS help developers implement responsive designs efficiently. A well-designed responsive site improves user engagement, SEO, and accessibility.`
  },
  {
    title: "Understanding REST APIs",
    content: `REST (Representational State Transfer) APIs are the backbone of modern web communication. They allow client-server communication over HTTP using standard methods like GET, POST, PUT, and DELETE.

Understanding how to consume and build REST APIs is critical for frontend developers. Tools like Postman help in testing APIs, while libraries like Axios or Fetch API are commonly used in React for making HTTP requests. RESTful architecture promotes scalability, separation of concerns, and easy integration with third-party services.`
  }
];


function App() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="app-container">
      <h1>Interactive Blog Viewer</h1>
      
      <ul className="blog-list">
        {blogs.map((blog, index) => (
          <li key={index} onClick={() => setSelectedBlog(blog)} className="blog-title">
            {blog.title}
          </li>
        ))}
      </ul>

      <div className="blog-content">
        {selectedBlog ? (
          <div>
            <h2>{selectedBlog.title}</h2>
            <p>{selectedBlog.content}</p>
          </div>
        ) : (
          <p className="select-message">Select a blog to read</p>
        )}
      </div>
    </div>
  );
}

export default App;
