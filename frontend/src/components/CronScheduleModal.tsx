import { useState } from "react";
import axios from "axios";

type Props = {
  onClose: () => void;
};

export default function CronScheduleModal({ onClose }: Props) {
  const [schedule, setSchedule] = useState("0 2 * * *");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateSchedule = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://localhost:4000/update-cron", { schedule });
      if (res.status === 200) {
        alert("Cron schedule updated successfully.");
        onClose();
      }
    } catch (err) {
      setError("Failed to update cron schedule. Please check the format.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md shadow">
        <h2 className="text-xl font-semibold mb-4">Update Cron Schedule</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateSchedule();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Cron Schedule</label>
            <input
              type="text"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="e.g., 0 2 * * *"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
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
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}