// import React from "react";
// import RatingStars from "../../common/RatingStars";
// import { Link } from "react-router-dom";

// const CourseCard = ({ course, imgHeight }) => {
//   return (
//     <Link to={`/course/${course._id}`}>
//       <div className={` `}>
//         <div className="rounded-lg">
//           <img
//             src={course.thumbnail}
//             alt={"course-thumbnail"}
//             className={`${imgHeight} object-cover rounded-xl w-full `}
//           />
//         </div>

//         <div className="flex flex-col gap-2 px-1 py-3">
//           <p className="text-xl text-[#F1F2FF]">{course.title}</p>
//           <p className="text-sm text-[#C5C7D4]">
//             {course.instructor.firstName} {course.instructor.lastName}
//           </p>
//           <div className="flex items-center gap-2">
//             <p className="text-[#FFF970]">{course.averageRating}</p>

//             <RatingStars rating={course.averageRating} />

//             <p className="text-[#6E727F]">{course.reviews.length} Ratings</p>
//           </div>
//           <p className="text-xl text-[#F1F2FF]">₹ {course.price}</p>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default CourseCard;

import React from "react";
import RatingStars from "../../common/RatingStars";
import { Link } from "react-router-dom";

const CourseCard = ({ course, imgHeight }) => {
  return (
    <Link to={`/course/${course._id}`}>
      <div className={` `}>
        <div className="rounded-lg">
          <img
            src={course.thumbnail}
            alt={"course-thumbnail"}
            className={`${imgHeight} object-cover rounded-xl w-full `}
          />
        </div>

        <div className="flex flex-col gap-2 px-1 py-3">
          <p className="text-xl text-[#F1F2FF]">{course.title}</p>
          <p className="text-sm text-[#C5C7D4]">
            {course.instructor
              ? `${course.instructor.firstName} ${course.instructor.lastName}`
              : "Unknown Instructor"}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-[#FFF970]">{course.averageRating || 0}</p>

            <RatingStars rating={course.averageRating || 0} />

            <p className="text-[#6E727F]">
              {course.reviews?.length || 0} Ratings
            </p>
          </div>
          <p className="text-xl text-[#F1F2FF]">₹ {course.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
