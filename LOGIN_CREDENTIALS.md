# 🔐 Gestura Login Credentials

## Test Accounts

### 👑 Admin Account
```
Email: admin@gestura.com
Password: admin123
Role: Admin
```

### 👨‍🏫 Teacher Account
```
Email: teacher@gestura.com
Password: teacher123
Role: Teacher
Institution: Sunshine Academy
```

### 👧 Student Account
```
Email: lily@gestura.com
Password: student123
Role: Student
Institution: Sunshine Academy
```

### 👨‍👩‍👧 Parent Account
```
Email: parent@gestura.com
Password: parent123
Role: Parent
Institution: Sunshine Academy
```

---

## How to Login

1. Go to http://localhost:3000
2. Select the role (Student/Teacher/Parent/Admin)
3. Enter email and password
4. Click "Sign In"

## Backend & Database

- **Backend**: http://localhost:5000
- **Database**: MongoDB (localhost:27017/gestura)
- **Status**: ✅ Running

## Error Messages

- **"Incorrect credentials"** - Wrong email or password
- **"Please select the correct role"** - Correct credentials but wrong role selected
- **"Connection error"** - Backend server not running
