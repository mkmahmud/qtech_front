# QuickHire | Frontend Documentation

QuickHire is a modern, high-performance job board application built with **Next.js 16** and **React 19**. This frontend is designed to be lean, accessible, and highly responsive, following the provided Figma design specifications strictly.

---

##   Live Demo
https://qtech-front.vercel.app

##   Api
https://qtechback.vercel.app

---

## 🛠️ Tech Stack & Decisions

### **Core Framework: Next.js 16 & React 19**

---

### **State Management: TanStack Query (React Query)**
 Used for server-state management. It handles caching, loading states, and automatic re-fetching of job listings and applications, ensuring the UI is always in sync with the backend without manual `useEffect` logic.

---

### **UI & Styling: Tailwind CSS & Shadcn UI**
Used to achieve the exact typography, spacing, and color palette from the Figma file. Shadcn UI provided a robust foundation for accessible components like Dialogs, Selects, and Inputs.

---

### **File Handling: UploadThing**
To fulfill the "Resume Link" requirement efficiently. Instead of handling complex `multipart/form-data` on the backend, UploadThing was integrated.

**Benefits:**
- Provides a secure, cloud-hosted URL for PDF resumes instantly  
- Drag-and-drop interface with real-time upload progress  

---

### **Form Handling: React Hook Form + Zod**
 Handles complex validation (like ensuring the resume link is a valid URL and the email is correctly formatted) with zero-re-render performance.

---

## 🏗️ Folder Structure
```text
src/
├── app/                # App Router (Pages, Layouts, Loading, Not-Found)
├── components/         
│   ├── ui/             # Atomic Shadcn components (Buttons, Inputs)
│   ├── shared/         # Common components (Navbar, Footer, Hero)
│   └── jobs/           # Feature-specific (JobCard, Filter, ApplyForm)
├── lib/
│   ├── api/            # Axios instances and API services
│   ├── hooks/          # Custom hooks (useAuth, useUpload)
│   └── uploadthing.ts  # UploadThing frontend configuration
├── types/              # TypeScript interfaces/enums
└── store/              # Auth context and global providers
```


---

## ⚡ Key Features

- **Smart Search & Filtering:**  
  Users can search by keyword and location. The URL updates dynamically, allowing users to share specific search results.

- **Rich Text Descriptions:**  
  Used Tiptap and React Markdown to allow Admin job postings to support headers, bold text, and lists.

- **Resume Integration:**  
  Secure PDF upload via UploadThing which returns a direct link for recruiters to view.

- **Admin Dashboard:**  
  A protected view for managing job listings (Add/Delete) and tracking candidate applications.

- **Optimized UX:**  
  Custom Skeleton Loaders prevent layout shifts, and Sonner toast notifications provide immediate feedback on actions (Apply, Login, Delete).

---


## Installation

1. Clone the repository:
```bash
git clone https://github.com/mkmahmud/qtech_front
cd qtech_front
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```
 

## Development

Start the development server with hot reload:
```bash
npm run dev
```