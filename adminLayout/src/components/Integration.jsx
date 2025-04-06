import "./NavBar.css";
import avt from "../assets/Avatar 313.png";
import bell from "../assets/bell.png";
import ques from "../assets/question.png";
import search from "../assets/search.png";
export default function Integration() {
  return (
    <>
      <div className="right1">
        <h2>Integrations</h2>
        <div className="search-box">
          <img src={search} />
          <input type="text" className="search-input" placeholder="Search..." />
        </div>
        <div className="headUser">
          <img src={bell} />
          <img src={ques} />

          <img src={avt} alt="User" className="avatar" />
        </div>
      </div>
      <h1 className="h1">Màn hình Integrations</h1>;
    </>
  );
}
