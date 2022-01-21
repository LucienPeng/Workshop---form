/*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*/

const submitBtn = document.querySelector(".submit-btn-form");
const studentsInfo = document.querySelectorAll(".students-info-form");
const resultSection = document.querySelector(".col.paragraph");
const studentsIDArray = [];
const studentsScoreArray = [];

// 取得輸入值並放入陣列之中
submitBtn.addEventListener("click", (e) => {
  e.preventDefault;

  studentsInfo.forEach((item) => {
    let studentsID = item.children[1].value;
    studentsIDArray.push(studentsID);
    let studentsScore = item.children[3].value;
    studentsScoreArray.push(studentsScore);
  });

  // 將學生資料放入物件之中
  let studentsList = [
    (student1 = {
      IdNo: studentsIDArray[0],
      score: studentsScoreArray[0],
    }),
    (student2 = {
      IdNo: studentsIDArray[1],
      score: studentsScoreArray[1],
    }),
    (student3 = {
      IdNo: studentsIDArray[2],
      score: studentsScoreArray[2],
    }),
    (student4 = {
      IdNo: studentsIDArray[3],
      score: studentsScoreArray[3],
    }),
    (student5 = {
      IdNo: studentsIDArray[4],
      score: studentsScoreArray[4],
    }),
  ];

  studentsList.forEach((item, index) => {
    let student = document.createElement("ul");
    let studentID = document.createElement("li");
    let studentScore = document.createElement("li");
    studentID.innerText = `學號： ${studentsList[index].IdNo} `;
    studentScore.innerText = `分數為： ${studentsList[index].score} `;
    student.appendChild(studentID);
    student.appendChild(studentScore);
    resultSection.appendChild(student);
  });

  //計算平均分數
  let average = 0;
  studentsScoreArray.forEach((item, index) => {
    average += Number(item);
  });
  // 將平均值的結果，寫於 HTML 段落中
  let result = document.createElement("li");
  average = average / studentsScoreArray.length;
  result.innerText = `總平均分數為： ${average} 分。`;
  resultSection.appendChild(result);
  resultSection.style.display = "block";

  //計算最高分並寫於 HTML 段落中
  let theHighest = findTheHighest(studentsScoreArray, studentsIDArray);
  let theHighestResult = document.createElement("li");
  theHighestResult.innerText = theHighest;
  resultSection.appendChild(theHighestResult);

  //計算最低分並寫於 HTML 段落中
  //   let theLowest = findTheLowest(studentsScoreArray, studentsIDArray);
  //   let theLowestResult = document.createElement("li");
  //   theLowestResult.innerText = theLowest;
  //   resultSection.appendChild(theLowestResult);

  //   console.log(resultSection);
});

//計算最高分
let theHighestID = 0;

function findTheHighest(scores, IDs) {
  let theHighestScore = scores[0];
  for (let i = 0; i <= scores.length; i++) {
    if (scores[i] > theHighestScore) {
      theHighestScore = scores[i];
      theHighestID = IDs[i];
      console.log(theHighestScore);
    }
  }
  return `學號${theHighestID}的學生考了最高分，分數為${theHighestScore}分。`;
}

//計算最低分
// let theLowestScore = 0;
// let theLowestID = 0;

// function findTheLowest(scores, IDs) {
//   for (let i = 0; i <= scores.length; i++) {
//     if (scores[i] <= scores[0]) {
//       theLowestScore = scores[i];
//       theLowestID = IDs[i];
//     }
//   }
//   return `學號${theLowestID}的學生考了最低分，分數為${theLowestScore}分。`;
// }
