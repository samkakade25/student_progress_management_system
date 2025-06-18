import { useEffect, useState } from "react";
import type { Student } from "../types/Student";
import { getStudents } from "../api/studentAPI";
import StudentTable from "../components/StudentTable";
import AddStudentModal from "../components/AddStudentModal";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    getStudents()
      .then((data) => {
        setStudents(data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(() => setLoading(false)); // Handle errors gracefully
  }, []);

  const handleView = (student: Student) => {
    alert(`Go to profile of ${student.name}`);
  };

  const handleAdd = (newStudent: Student) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-2xl font-semibold mb-4">
        <h1>Student Progress Dashboard</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Student
        </button>
        {loading ? (
          <p>Loading...</p> // Display loading message while data is being fetched
        ) : (
          <StudentTable students={students} onView={handleView} />
        )}
      </div>
      {showModal && (
        <AddStudentModal
          onClose={() => setShowModal(false)}
          onSuccess={handleAdd}
        />
      )}
    </div>
  );
}
