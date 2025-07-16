import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../../../common/Spinner";
import { Link } from "react-router-dom";
import { getInstructorDashboardData } from "../../../../services/operations/profileServices";
import InstructorChart from "./InstructorChart";

const InstructorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchInstructorDashboardData = async () => {
      setLoading(true);
      const response = await getInstructorDashboardData(token);
      if (response) {
        setDashboardData(response);
      }
      // console.log(response);

      // Fetch created Courses
      // const result = await getCreatedCourses(token);
      // if (result) {
      //   setCourses(result);
      // }
      setLoading(false);
    };
    fetchInstructorDashboardData();
  }, [token]);

  return (
    <div>
      <div className="space-y-2">
        <p className="text-[#F1F2FF] text-2xl font-bold ">
          Hi, {user.firstName} 👋{" "}
        </p>
        <p className="text-[#999DAA] font-medium ">Let's start something new</p>
      </div>

      <div>
        {loading ? (
          <div className="h-[calc(100vh-10rem)] grid place-items-center">
            <Spinner />
          </div>
        ) : !dashboardData || dashboardData.totalPublishedCourses === 0 ? (
          <div className="text-center mt-20 bg-[#161D29] px-6  py-20 rounded-md">
            <p className="text-2xl font-bold text-[#F1F2FF]">
              You have{" "}
              <span className="font-extrabold text-[#F79CB0]">not</span>{" "}
              published any courses yet
            </p>
            <Link to={"/dashboard/add-course"}>
              <p className="mt-3  text-lg font-semibold text-[#FFD60A] underline">
                Create a course
              </p>
            </Link>
          </div>
        ) : (
          <div>
            {/* Pie charts and Stats */}
            <div className="flex flex-col md:flex-row gap-5 my-10">
              {/* Statistics */}
              <div className="min-h-fit min-w-[250px] rounded-md bg-[#161D29] p-6">
                <p className="text-lg font-bold text-[#F1F2FF]">Statistics</p>

                <div className="flex flex-col gap-4 mt-4 mb-4">
                  <div>
                    <p className="text-lg text-[#999DAA]">Total Courses</p>
                    <p className="text-3xl font-semibold text-[#C5C7D4]">
                      {dashboardData.totalPublishedCourses}
                    </p>
                  </div>

                  <div>
                    <p className="text-lg text-[#999DAA]">Total Students</p>
                    <p className="text-3xl font-semibold text-[#C5C7D4]">
                      {dashboardData.totalStudents}
                    </p>
                  </div>

                  <div>
                    <p className="text-lg text-[#999DAA]">Total Income</p>
                    <p className="text-3xl font-semibold text-[#C5C7D4]">
                      ₹ {dashboardData.totalIncome}
                    </p>
                  </div>
                </div>
              </div>

              {/* Pie charts */}
              <div className="w-full">
                {dashboardData.totalIncome > 0 ||
                dashboardData.totalStudents > 0 ? (
                  <div className="h-full">
                    <InstructorChart dashboardData={dashboardData} />
                  </div>
                ) : (
                  <div className="bg-[#161D29] h-full  rounded-md p-6">
                    <p className="text-lg text-[#F1F2FF] font-bold">
                      Visualize
                    </p>
                    <p className="mt-4 text-xl text-[#999DAA] font-medium ">
                      Not Enough Data To Visualize
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Published Courses */}
            <div className="w-full rounded-md bg-[#161D29] p-6">
              <div className="flex justify-between items-center">
                <p className="text-[#F1F2FF] text-lg font-bold">
                  Your Published Courses
                </p>
                <Link to={"/dashboard/my-courses"}>
                  <div className=" text-[#FFD60A] text-xs font-semibold">
                    View All
                  </div>
                </Link>
              </div>

              <div className="flex flex-col md:flex-row gap-x-5 gap-y-7 my-4">
                {dashboardData.coursesWithStats
                  .slice(0, 3)
                  .map((courseWithStats, ind) => (
                    <div key={ind} className="w-full md:w-1/3">
                      <img
                        src={courseWithStats.course.thumbnail}
                        alt="Course-thumbnail"
                        className="h-[200px] w-full rounded-md object-cover"
                      />

                      <p className="mt-3 text-sm font-medium text-[#C5C7D4]">
                        {courseWithStats.course.title}
                      </p>

                      <p className="mt-1 text-xs font-medium text-[#838894]">
                        {courseWithStats.course.numberOfEnrolledStudents}{" "}
                        students | ₹ {courseWithStats.course.price}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDashboard;
