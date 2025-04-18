import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import Loader from "../Loader.jsx";
import HappyGit from "../../assets/HappyGit.png";

import chaiImg from "../../assets/chaiimg.png";
//import Baychai from "../BayChai/Bhaichai.jsx";
import "./Home.css";
import { TypeAnimation } from "react-type-animation";

//import Button from "../Button/Button.jsx";
function Home() {
  const [username, setUsername] = useState("");
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const bottomRef = useRef(null);
  useEffect(() => {
    if (review && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [review]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setReview("");
    setProfileImg("");
    setLoading(true);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    try {
      const profileRes = await fetch(
        `https://api.github.com/users/${username}`
      );
      const profileData = await profileRes.json();

      if (!profileRes.ok || !profileData.avatar_url) {
        throw new Error("GitHub profile not found.");
      }

      setProfileImg(profileData.avatar_url);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      const res = await fetch("http://localhost:5000/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setReview(data.review);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div>
        <div>
          <center>
            <span className="dot"></span>
            <span
              className="dot"
              style={{ position: "absolute", left: "0%", top: "0px" }}
            ></span>
            <div className="Mainchai">
              <Link to={"/bhaichai"}>
                <div className="chai">
                  Buy me Chai
                  <img
                    src={chaiImg}
                    alt="😍"
                    width={50}
                    height={50}
                    style={{ background: "#ccb136" }}
                  />
                </div>
              </Link>
            </div>
            <center>
              <img
                src={HappyGit}
                alt="❤️"
                className="img1"
                width={300}
                height={300}
              />
            </center>
            <h1>GitHub genuine Profile Reviewer</h1>
            <p>
              Enter your GitHub username to get a smart review of your profile.
            </p>
            <span
              className="dot"
              style={{ position: "absolute", right: "6%", button: "30%" }}
            ></span>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter Github User Name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  border: "2px solid #454141",
                  borderRadius: "4px",
                  height: "36px",
                  width: "10%",
                  padding: " 0 0 0 10px",
                }}
              />
              <button type="submit" disabled={loading}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 36 36"
                  width="36px"
                  height="36px"
                >
                  <rect
                    width="36"
                    height="36"
                    x="0"
                    y="0"
                    fill="#fdd835"
                  ></rect>
                  <path
                    fill="#e53935"
                    d="M38.67,42H11.52C11.27,40.62,11,38.57,11,36c0-5,0-11,0-11s1.44-7.39,3.22-9.59 c1.67-2.06,2.76-3.48,6.78-4.41c3-0.7,7.13-0.23,9,1c2.15,1.42,3.37,6.67,3.81,11.29c1.49-0.3,5.21,0.2,5.5,1.28 C40.89,30.29,39.48,38.31,38.67,42z"
                  ></path>
                  <path
                    fill="#b71c1c"
                    d="M39.02,42H11.99c-0.22-2.67-0.48-7.05-0.49-12.72c0.83,4.18,1.63,9.59,6.98,9.79 c3.48,0.12,8.27,0.55,9.83-2.45c1.57-3,3.72-8.95,3.51-15.62c-0.19-5.84-1.75-8.2-2.13-8.7c0.59,0.66,3.74,4.49,4.01,11.7 c0.03,0.83,0.06,1.72,0.08,2.66c4.21-0.15,5.93,1.5,6.07,2.35C40.68,33.85,39.8,38.9,39.02,42z"
                  ></path>
                  <path
                    fill="#212121"
                    d="M35,27.17c0,3.67-0.28,11.2-0.42,14.83h-2C32.72,38.42,33,30.83,33,27.17 c0-5.54-1.46-12.65-3.55-14.02c-1.65-1.08-5.49-1.48-8.23-0.85c-3.62,0.83-4.57,1.99-6.14,3.92L15,16.32 c-1.31,1.6-2.59,6.92-3,8.96v10.8c0,2.58,0.28,4.61,0.54,5.92H10.5c-0.25-1.41-0.5-3.42-0.5-5.92l0.02-11.09 c0.15-0.77,1.55-7.63,3.43-9.94l0.08-0.09c1.65-2.03,2.96-3.63,7.25-4.61c3.28-0.76,7.67-0.25,9.77,1.13 C33.79,13.6,35,22.23,35,27.17z"
                  ></path>
                  <path
                    fill="#01579b"
                    d="M17.165,17.283c5.217-0.055,9.391,0.283,9,6.011c-0.391,5.728-8.478,5.533-9.391,5.337 c-0.913-0.196-7.826-0.043-7.696-5.337C9.209,18,13.645,17.32,17.165,17.283z"
                  ></path>
                  <path
                    fill="#212121"
                    d="M40.739,37.38c-0.28,1.99-0.69,3.53-1.22,4.62h-2.43c0.25-0.19,1.13-1.11,1.67-4.9 c0.57-4-0.23-11.79-0.93-12.78c-0.4-0.4-2.63-0.8-4.37-0.89l0.1-1.99c1.04,0.05,4.53,0.31,5.71,1.49 C40.689,24.36,41.289,33.53,40.739,37.38z"
                  ></path>
                  <path
                    fill="#81d4fa"
                    d="M10.154,20.201c0.261,2.059-0.196,3.351,2.543,3.546s8.076,1.022,9.402-0.554 c1.326-1.576,1.75-4.365-0.891-5.267C19.336,17.287,12.959,16.251,10.154,20.201z"
                  ></path>
                  <path
                    fill="#212121"
                    d="M17.615,29.677c-0.502,0-0.873-0.03-1.052-0.069c-0.086-0.019-0.236-0.035-0.434-0.06 c-5.344-0.679-8.053-2.784-8.052-6.255c0.001-2.698,1.17-7.238,8.986-7.32l0.181-0.002c3.444-0.038,6.414-0.068,8.272,1.818 c1.173,1.191,1.712,3,1.647,5.53c-0.044,1.688-0.785,3.147-2.144,4.217C22.785,29.296,19.388,29.677,17.615,29.677z M17.086,17.973 c-7.006,0.074-7.008,4.023-7.008,5.321c-0.001,3.109,3.598,3.926,6.305,4.27c0.273,0.035,0.48,0.063,0.601,0.089 c0.563,0.101,4.68,0.035,6.855-1.732c0.865-0.702,1.299-1.57,1.326-2.653c0.051-1.958-0.301-3.291-1.073-4.075 c-1.262-1.281-3.834-1.255-6.825-1.222L17.086,17.973z"
                  ></path>
                  <path
                    fill="#e1f5fe"
                    d="M15.078,19.043c1.957-0.326,5.122-0.529,4.435,1.304c-0.489,1.304-7.185,2.185-7.185,0.652 C12.328,19.467,15.078,19.043,15.078,19.043z"
                  ></path>
                </svg>
                <span class="now">now!</span>
                <span class="play">See</span>
              </button>
              {/* <Button type="submit" disabled={loading}>
                GenerateImage
              </Button> */}
              {loading && <Loader />}
            </form>

            {error && (
              <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
            )}
            <div className="DataFetch">
              {profileImg && (
                <div ref={bottomRef} style={{ marginTop: "20px" }}>
                  <img
                    src={profileImg}
                    alt="GitHub Profile"
                    width="200"
                    style={{ borderRadius: "50%" }}
                  />
                  <p>@{username}</p>
                </div>
              )}
              <div>
                {review && (
                  <div className="review-box">
                    <TypeAnimation
                      key={review}
                      sequence={[review, 1000]}
                      speed={50}
                      style={{ whiteSpace: "pre-line", fontSize: "18px" }}
                    />
                  </div>
                )}

                {/* <Loader/> */}
              </div>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
}

export default Home;
