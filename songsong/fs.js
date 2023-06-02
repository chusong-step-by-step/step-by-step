const fs = require("fs");

const makeTwoDigits = (data) => {
  return data.toString().padStart(2, "0");
};

// 오늘 날짜 구하기
const today = new Date();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const date = today.getDate();

// 파일명 : 오늘 날짜 형식 만들기
const dateFormatting = (year, month, date) => {
  return `${year}-${makeTwoDigits(month)}-${makeTwoDigits(date)}`;
};

const dateFormat = dateFormatting(year, month, date);

// 폴더명 : 몇 주차인지 구하기
const getWeekNumber = (year, month, date) => {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const weekOfFirstDay = firstDayOfMonth.getDay();
  return parseInt((weekOfFirstDay + date) / 7) + 1;
};

const week = getWeekNumber(year, month, date);
const weeks = ["첫째주", "둘째주", "셋째주", "넷째주", "다섯째주"];

const dirName = `${year}-${makeTwoDigits(month)}-${weeks[week - 1]}`;

// 디렉토리 만들기
const makeDir = (dirName) => {
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, (err) => {
      if (err) {
        console.log("디렉토리 생성 중 오류가 발생!!");
      } else {
        console.log("디렉토리 추가 완료!");
      }
    });
  }
};

// 파일 만들기
const makeFile = (dirName, dateFormat) => {
  // 만약 기존 파일이 이미 있다면 추가하지 않음.
  if (!fs.existsSync(`${dirName}/${dateFormat}.md`)) {
    fs.writeFile(
      `${dirName}/${dateFormat}.md`,
      `# ${dateFormat}의 TIL`,
      (err) => {
        if (err) {
          console.log("에러 발생!:", err);
        } else {
          console.log("파일이 성공적으로 추가되었습니다.");
        }
      }
    );
  } else {
    console.log("이미 파일이 존재합니다.");
  }
};

makeDir(dirName);
makeFile(dirName, dateFormat);
