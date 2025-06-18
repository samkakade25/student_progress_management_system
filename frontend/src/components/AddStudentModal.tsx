import { z } from "zod";
import type { Student } from "../types/Student";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const studentSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(10),
  codeforcesHandle: z.string().min(1),
});

type StudentForm = z.infer<typeof studentSchema>;

type Props = {
  onClose: () => void;
  onSuccess: (student: Student) => void;
};

export default function AddStudentModal({ onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentForm>({
    resolver: zodResolver(studentSchema),
  });

  const onSubmit = async (data: StudentForm) => {
    try {
      setLoading(true);
      const res = await axios.post("http://localhost:4000/students", data);
      onSuccess(res.data);
      onClose();
    } catch (err) {
      console.error("Failed to add student", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md shadow">
        <h2 className="text-xl font-semibold mb-4 ">Add Student</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              {...register("name")}
              className="w-full border p-2 rounded"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              {...register("email")}
              className="w-full border p-2 rounded"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              {...register("phone")}
              className="w-full border p-2 rounded"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Codeforces Handle
            </label>
            <input
              {...register("codeforcesHandle")}
              className="w-full border p-2 rounded"
            />
            {errors.codeforcesHandle && (
              <p className="text-red-500 text-sm">
                {errors.codeforcesHandle.message}
              </p>
            )}
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="text-gray-700">
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
