import { useState } from "react";

function Sciencegrade() {
    const [subject, setSubject] = useState<string>(""); // เก็บค่าที่พิมพ์ใน input รายวิชา
    const [grade, setGrade] = useState<string>("A"); // เก็บค่าที่เลือกใน select เกรด
    const [subjects, setSubjects] = useState<{ name: string; grade: string }[]>([]); // เก็บรายการวิชาทั้งหมด          
    const [gpa, setGpa] = useState<number | null>(null); // เก็บค่า GPA

    const gradePoints: { [key: string]: number } = {
            
        "A": 4.0,
        "B+": 3.5,
        "B": 3.0,
        "C+": 2.5,
        "C": 2.0,
        "D+": 1.5,          
        "D": 1.0,
        "F": 0.0,
        "W": 0.0 // W ไม่คิดคะแนน
    };
    const addSubject = () => {
        if (subject.trim() === "") return;
        setSubjects([...subjects, { name: subject, grade }]);
        setSubject("");
        setGrade("A");
        setGpa(null); // เคลียร์ค่า GPA เมื่อเพิ่มวิชาใหม่
    }
    const deleteSubject = (index: number) => {              
        const newSubjects = subjects.filter((_, i) => i !== index);
        setSubjects(newSubjects);
        setGpa(null); // เคลียร์ค่า GPA เมื่อมีการลบวิชา
    }
    const calculateGpa = () => {
        if (subjects.length === 0) return;
        const totalPoints = subjects.reduce((sum, subj) => sum + (gradePoints[subj.grade] || 0), 0);
        setGpa(totalPoints / subjects.length);
    }
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Science Grade Tracker</h1>
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter subject name"
            />
            <select value={grade} onChange={(e) => setGrade(e.target.value)}>
                {Object.keys(gradePoints).map((g) => (
                    <option key={g} value={g}>{g}</option>

                ))}
            </select>
            <button onClick={addSubject}>Add Subject</button>
            <ul style={{ listStyle: "none", padding: 0 }}>
                {subjects.map((subj, index) => (
                    <li key={index} style={{ margin: "5px 0", color: subj.grade === "F" ? "red" : "black" }}>
                        {subj.name} - {subj.grade}
                        <button
                            onClick={() => deleteSubject(index)}
                            style={{ marginLeft: 10, color: "red" }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={calculateGpa}>Calculate GPA</button>
            {gpa !== null && <h2>Your GPA: {gpa.toFixed(2)}</h2>}
        </div>
    );
}
export default Sciencegrade;
