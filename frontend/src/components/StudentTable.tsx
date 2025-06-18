import type { Student } from "../types/Student";

type Props = {
  students: Student[];
  onView: (student: Student) => void;
};

export default function StudentTable({ students, onView }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded shadow">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">Handle</th>
            <th className="p-3 text-left">Rating</th>
            <th className="p-3 text-left">Max Rating</th>
            <th className="p-3 text-left">Last Sync</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-3">{s.name}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3">{s.phone}</td>
              <td className="p-3">{s.codeforcesHandle}</td>
              <td className="p-3">{s.currentRating}</td>
              <td className="p-3">{s.maxRating}</td>
              <td className="p-3 text-sm text-gray-500">
                {s.cfDataUpdatedAt ? new Date(s.cfDataUpdatedAt).toLocaleString() : "-"}
              </td>
              <td className="p-3">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                  onClick={() => onView(s)}
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}