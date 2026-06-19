import {
  FaUserGraduate,
  FaImages,
} from "react-icons/fa";

export default function DashboardCard({
  title,
  value,
  icon,
}) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      p-6
      shadow-lg
      hover:-translate-y-2
      transition
      "
    >
      <div className="flex justify-between items-center">

        <div>

          <p className="text-gray-500">
            {title}
          </p>

          <h2 className="text-4xl font-bold">
            {value}
          </h2>

        </div>

        <div className="text-blue-600 text-4xl">
          {icon}
        </div>

      </div>

    </div>
  );
}