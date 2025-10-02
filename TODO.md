# Deployment TODO

- [x] Fix backend server.js to mount auth routes
- [x] Update .env with correct database name
- [x] Commit and push backend fixes to GitHub
- [ ] Deploy backend to Render:
  - Create Render account and connect GitHub repo
  - Create new Web Service for backend
  - Set root directory: backend
  - Set build command: npm install
  - Set start command: npm start
  - Set environment variables: MONGO_URI, JWT_SECRET, PORT
  - Deploy
- [ ] Get deployed backend URL from Render
- [ ] Configure frontend to use deployed backend:
  - Set VITE_API_URL environment variable to backend URL
- [ ] Deploy frontend to GitHub Pages:
  - Run npm run deploy in Frontend directory
- [ ] Test the deployed application
