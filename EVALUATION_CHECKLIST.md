# 📋 Evaluation Checklist - Quick Reference

## ⏰ Evaluation Details
- **Date**: November 12, 2025
- **Time**: 6:10 PM - 6:20 PM
- **Room**: A Block, 506
- **Evaluator**: Neha Raghav
- **Duration**: 10 minutes

---

## 🚨 CRITICAL - Do This NOW

### 1. Update Vercel Environment Variable
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click your project
3. Settings → Environment Variables
4. Add/Update:
   ```
   VITE_API_URL = https://hotel-booking-system-rv34.onrender.com/api
   ```
5. Save and **REDEPLOY**

### 2. Update README.md
Replace these placeholders in README.md:
- `YOUR_VERCEL_URL_HERE` → Your actual Vercel URL
- `YOUR_GITHUB_REPO_URL_HERE` → Your GitHub repo URL

### 3. Commit and Push
```bash
git add .
git commit -m "Add comprehensive README and final fixes"
git push origin main
```

---

## ✅ Pre-Evaluation Checklist

### **Deployment** (MUST HAVE)
- [ ] Frontend deployed on Vercel: ________________
- [ ] Backend deployed on Render: ✅ https://hotel-booking-system-rv34.onrender.com
- [ ] MongoDB Atlas connected: ________________
- [ ] `VITE_API_URL` set in Vercel: ________________
- [ ] Frontend redeployed after env variable update: ________________

### **GitHub Repository** (MUST HAVE)
- [ ] README.md includes project proposal: ✅
- [ ] README.md includes hosted frontend URL: ________________
- [ ] README.md includes hosted backend URL: ✅
- [ ] All code committed and pushed: ________________

### **Functionality Testing** (MUST WORK)
- [ ] Signup works on live site: ________________
- [ ] Login works on live site: ________________
- [ ] JWT token generated: ________________
- [ ] JWT token verifiable on jwt.io: ________________
- [ ] Password hashed in database: ________________
- [ ] Protected routes work: ________________

### **Pages Working** (SHOULD WORK)
- [ ] Landing page loads: ________________
- [ ] Hotels page loads: ________________
- [ ] Rooms page loads: ________________
- [ ] Featured page loads: ________________
- [ ] Room details page loads: ________________
- [ ] My Bookings page loads: ________________

---

## 🎯 Demo Flow (10 Minutes)

### **Minute 1-2: Introduction**
"Hello, I'm Pratyush Parida. I've built ApnaStays, a full-stack hotel booking system using MERN stack with custom JWT authentication."

**Show:**
- Landing page
- Mention: React, Node.js, Express, MongoDB

### **Minute 3-4: Authentication Demo**
**Signup:**
1. Click "Login" button
2. Switch to "Sign up"
3. Enter: username, email, password
4. Click "Sign up"
5. **Point out**: "Password is being hashed with bcrypt before storing"

**Show JWT Token:**
1. Open DevTools (F12)
2. Application → Local Storage
3. Show `token` key
4. Copy token value
5. Go to [jwt.io](https://jwt.io)
6. Paste token
7. **Point out**: "Token contains user ID and expiry date"

### **Minute 5-6: Database Verification**
**Option A - Show MongoDB Atlas:**
1. Open MongoDB Atlas
2. Browse Collections → Users
3. Show user with hashed password
4. **Point out**: "Password is hashed with bcrypt, not plain text"

**Option B - Show API Response:**
1. Open DevTools → Network tab
2. Show signup/login request
3. Show response with token

### **Minute 7-8: Features Demo**
**Browse Hotels:**
1. Navigate to Hotels page
2. Show filters (city, price, room type)
3. Click on a hotel
4. Show room details page

**My Bookings:**
1. Click user avatar
2. Click "My Booking"
3. Show bookings page
4. **Point out**: "This is a protected route, requires authentication"

### **Minute 9: Code Walkthrough**
**Show Backend Code:**
1. Open GitHub repository
2. Show `backend/routes/auth.js`
3. **Point out**: 
   - Password hashing with bcrypt
   - JWT token generation
   - Input validation

**Show Frontend Code:**
1. Show `frontend/src/context/AuthContext.jsx`
2. **Point out**:
   - Token storage in localStorage
   - Protected route handling

### **Minute 10: Conclusion**
"The application demonstrates:
- Custom authentication with JWT
- Password hashing with bcrypt
- Protected API routes
- Role-based access control
- Full CRUD operations
- Deployed on Vercel and Render"

---

## 🔑 Key Points to Mention

### **Authentication**
✅ "I implemented custom JWT authentication, not using third-party services like Clerk"
✅ "Passwords are hashed using bcrypt with 10 salt rounds before storing in database"
✅ "JWT tokens have 30-day expiry and contain user ID in the payload"
✅ "Tokens are verified on every protected route request"

### **Backend**
✅ "Built RESTful API with Express.js"
✅ "MongoDB with Mongoose for data modeling"
✅ "Input validation using express-validator"
✅ "CORS enabled for cross-origin requests"
✅ "Deployed on Render with MongoDB Atlas"

### **Frontend**
✅ "React with Vite for fast development"
✅ "React Router for client-side routing"
✅ "Context API for state management"
✅ "Tailwind CSS for responsive design"
✅ "Deployed on Vercel"

### **Security**
✅ "Password never stored in plain text"
✅ "JWT tokens for stateless authentication"
✅ "Protected routes require valid token"
✅ "Role-based access control (user, hotelOwner, admin)"

---

## 🚨 Common Questions & Answers

**Q: Why did you use custom authentication instead of Clerk?**
A: "The evaluation requirements specified custom authentication with password hashing and JWT tokens that can be verified on jwt.io. Clerk manages authentication externally, so I built a custom solution to meet these requirements."

**Q: How is the password secured?**
A: "Passwords are hashed using bcrypt with 10 salt rounds before storing in MongoDB. The password field has `select: false` in the schema, so it's never returned in API responses."

**Q: Can you show me the JWT token?**
A: "Yes, let me open DevTools → Application → Local Storage. Here's the token. If I paste it on jwt.io, you can see it contains the user ID and expiry timestamp."

**Q: How do protected routes work?**
A: "When a user makes a request to a protected route, the frontend sends the JWT token in the Authorization header as 'Bearer {token}'. The backend middleware verifies the token, extracts the user ID, and attaches the user to the request object."

**Q: What happens if the token is invalid?**
A: "The middleware returns a 401 Unauthorized error, and the frontend redirects the user to the login page."

**Q: Can you show me the database?**
A: "Yes, let me open MongoDB Atlas. Here you can see the users collection with hashed passwords, hotels, rooms, and bookings collections."

---

## 📱 URLs to Have Ready

### **Live URLs**
- Frontend: ________________ (Your Vercel URL)
- Backend: https://hotel-booking-system-rv34.onrender.com
- API Health: https://hotel-booking-system-rv34.onrender.com/api/health
- GitHub: ________________ (Your GitHub repo)

### **Tools**
- JWT Decoder: https://jwt.io
- MongoDB Atlas: https://cloud.mongodb.com
- Vercel Dashboard: https://vercel.com/dashboard
- Render Dashboard: https://dashboard.render.com

---

## 🎒 What to Have Open

### **Before Evaluation Starts:**
1. **Browser Tab 1**: Your live Vercel site (logged out)
2. **Browser Tab 2**: jwt.io
3. **Browser Tab 3**: MongoDB Atlas (logged in, on Users collection)
4. **Browser Tab 4**: GitHub repository (on README.md)
5. **Browser Tab 5**: Vercel dashboard (showing environment variables)
6. **DevTools**: Ready to open (F12)

### **Optional:**
- VS Code with project open
- Postman/Thunder Client with API requests ready

---

## ⚠️ Troubleshooting

### **If Signup Doesn't Work:**
1. Check browser console for errors
2. Check Network tab for failed requests
3. Verify `VITE_API_URL` is set in Vercel
4. Verify backend is running (check health endpoint)
5. Check MongoDB Atlas connection

### **If JWT Token Not Generated:**
1. Check backend logs in Render
2. Verify `JWT_SECRET` is set in Render
3. Check signup response in Network tab

### **If Protected Routes Don't Work:**
1. Check if token exists in localStorage
2. Verify token is being sent in Authorization header
3. Check backend middleware is working

---

## 💡 Pro Tips

1. **Practice the demo flow** at least once before evaluation
2. **Have test credentials ready**: test@example.com / test123
3. **Clear browser cache** before demo to avoid issues
4. **Test on incognito window** to ensure fresh state
5. **Have backup plan**: If live site fails, show local version
6. **Be confident**: You built a complete full-stack application!

---

## 🎉 You've Got This!

You've built:
✅ Complete MERN stack application
✅ Custom JWT authentication
✅ Password hashing with bcrypt
✅ Protected API routes
✅ Role-based access control
✅ Deployed frontend and backend
✅ Comprehensive documentation

**Good luck with your evaluation, Pratyush! 🚀**

