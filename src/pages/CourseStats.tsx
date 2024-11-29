import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { getStats } from "../services/PaymentService";
import { getCoursesMe } from "../services/CourseService";

type Course = {
  _id: string;
  title: string;
  subtitle: string;
  price: number;
  category: string[];
  level: string[];
  language: string[];
  sections: any[];
  thumbnail: string;
  created_at: string;
};

const PaymentStatisticsCharts: React.FC = () => {
  const token = localStorage.getItem("token");
  const [courses, setCourses] = useState<Course[]>([]);
  const [currentCourseId, setCurrentCourseId] = useState<string | null>(null);

  const [dayData, setDayData] = useState<{
    labels: string[];
    values: number[];
  }>({ labels: [], values: [] });
  const [weekData, setWeekData] = useState<{
    labels: string[];
    values: number[];
  }>({ labels: [], values: [] });
  const [monthData, setMonthData] = useState<{
    labels: string[];
    values: number[];
  }>({ labels: [], values: [] });
  const [yearData, setYearData] = useState<{
    labels: string[];
    values: number[];
  }>({ labels: [], values: [] });

  const fetchStatistics = async (courseId: string) => {
    try {
      const dayStats = await getStats(
        token,
        `filter_type=day&course_id=${courseId}`
      );
      setDayData({
        labels: Object.keys(dayStats.data.statistics),
        values: Object.values(dayStats.data.statistics),
      });

      const weekStats = await getStats(
        token,
        `filter_type=week&course_id=${courseId}`
      );
      setWeekData({
        labels: Object.keys(weekStats.data.statistics),
        values: Object.values(weekStats.data.statistics),
      });

      const monthStats = await getStats(
        token,
        `filter_type=month&course_id=${courseId}`
      );
      setMonthData({
        labels: Object.keys(monthStats.data.statistics),
        values: Object.values(monthStats.data.statistics),
      });

      const yearStats = await getStats(
        token,
        `filter_type=year&course_id=${courseId}`
      );
      setYearData({
        labels: Object.keys(yearStats.data.statistics),
        values: Object.values(yearStats.data.statistics),
      });
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  useEffect(() => {
    const fetchCoursesMe = async () => {
      const data = await getCoursesMe(token);
      if (data.status <= 305) {
        setCourses(data.data.data);
        if (data.data.data.length > 0) {
          setCurrentCourseId(data.data.data[0]._id); // Set the first course as the default
        }
      }
    };
    fetchCoursesMe();
  }, [token]);

  useEffect(() => {
    if (currentCourseId) {
      fetchStatistics(currentCourseId);
    }
  }, [currentCourseId]);

  return (
    <div style={{ display: "flex", gap: "16px" }}>
      {/* Left Panel for Course List */}
      <div
        style={{
          width: "300px",
          border: "1px solid #ccc",
          padding: "16px",
          borderRadius: "8px",
          overflowY: "auto",
        }}
      >
        <h3>Courses</h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {courses.map((course) => (
            <li
              key={course._id}
              style={{
                padding: "8px",
                cursor: "pointer",
                background:
                  currentCourseId === course._id ? "#e0e0e0" : "transparent",
                borderRadius: "4px",
              }}
              onClick={() => setCurrentCourseId(course._id)}
            >
              {course.title}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel for Statistics */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          flex: 1,
        }}
      >
        <div>
          <h3>Day Statistics</h3>
          <BarChart
            series={[{ data: dayData.values }]}
            xAxis={[{ data: dayData.labels, scaleType: "band" }]}
            width={500}
            height={300}
          />
        </div>
        <div>
          <h3>Week Statistics</h3>
          <BarChart
            series={[{ data: weekData.values }]}
            xAxis={[{ data: weekData.labels, scaleType: "band" }]}
            width={500}
            height={300}
          />
        </div>
        <div>
          <h3>Month Statistics</h3>
          <BarChart
            series={[{ data: monthData.values }]}
            xAxis={[{ data: monthData.labels, scaleType: "band" }]}
            width={500}
            height={300}
          />
        </div>
        <div>
          <h3>Year Statistics</h3>
          <BarChart
            series={[{ data: yearData.values }]}
            xAxis={[{ data: yearData.labels, scaleType: "band" }]}
            width={500}
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentStatisticsCharts;
