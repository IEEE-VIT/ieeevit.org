import React, { useState, useEffect, useRef } from "react";

export default function Home({ theme, onNavigate }) {
  const [data, setData] = useState(null);
  const [boardData, setBoardData] = useState([]);
  const [boardColumns, setBoardColumns] = useState(5);

  // Refs for Scroll Carousels (TechLoop & Events)
  const techloopScrollContainer = useRef(null);
  const eventsScrollContainer = useRef(null);

  // Refs and state for Blogs & Podcast Carousels
  const blogsContainer = useRef(null);
  const [blogsIndex, setBlogsIndex] = useState(0);
  const [showBlogsPrev, setShowBlogsPrev] = useState(false);
  const [showBlogsNext, setShowBlogsNext] = useState(true);

  const podcastContainer = useRef(null);
  const [podcastIndex, setPodcastIndex] = useState(0);
  const [showPodcastPrev, setShowPodcastPrev] = useState(false);
  const [showPodcastNext, setShowPodcastNext] = useState(true);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch((err) => console.error("Error fetching data.json:", err));

    fetch("/alumni_board/board.json")
      .then((res) => res.json())
      .then((d) => {
        if (d && d["2025-26"]) {
          setBoardData(d["2025-26"].board);
        }
      })
      .catch((err) => console.error("Error fetching board.json:", err));
  }, []);

  // Columns calculation for the board section
  useEffect(() => {
    if (boardData.length === 0) return;
    const adjustBoard = () => {
      const boardEl = document.getElementById("board");
      if (!boardEl) return;
      const clientWidth = boardEl.clientWidth;
      let count = Math.floor(clientWidth / 185);

      if (boardData.length % count !== 0) {
        count = boardData.length % (count - 1) === 0 ? count - 1 : count;
      }
      count = Math.max(1, Math.min(count, 5));
      setBoardColumns(count);
    };

    adjustBoard();
    window.addEventListener("resize", adjustBoard);
    return () => window.removeEventListener("resize", adjustBoard);
  }, [boardData]);

  // Helper for Theme images
  const getThemeSrc = (src) => {
    if (theme === "dark") {
      return src.replace("-light", "-dark").replace("_light", "_dark");
    } else {
      return src.replace("-dark", "-light").replace("_dark", "_light");
    }
  };

  // Scroll handler for TechLoop/Events
  const handleScrollPrev = (ref) => {
    const container = ref.current;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth - containerWidth;
    const previousScroll = currentScroll - containerWidth;

    if (previousScroll < 0) {
      container.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      container.scrollTo({ left: previousScroll, behavior: "smooth" });
    }
  };

  const handleScrollNext = (ref) => {
    const container = ref.current;
    if (!container) return;
    const containerWidth = container.offsetWidth;
    const currentScroll = container.scrollLeft;
    const maxScroll = container.scrollWidth;
    const nextScroll = currentScroll + containerWidth;

    if (nextScroll >= maxScroll) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      container.scrollTo({ left: nextScroll, behavior: "smooth" });
    }
  };

  // Swipe/Scroll handlers for Blogs and Podcasts
  const updateBlogsButtons = () => {
    const container = blogsContainer.current;
    if (!container || !data?.blogs) return;
    const slides = Array.from(container.children);
    let index = 0;
    slides.forEach((slide, idx) => {
      const rect = slide.getBoundingClientRect();
      if (rect.left >= 0 && rect.right <= window.innerWidth) {
        index = idx;
      }
    });
    setBlogsIndex(index);
    setShowBlogsPrev(index > 0);
    setShowBlogsNext(index < data.blogs.length - 1);
  };

  const updatePodcastButtons = () => {
    const container = podcastContainer.current;
    if (!container || !data?.podcast) return;
    const slides = Array.from(container.children);
    let index = 0;
    slides.forEach((slide, idx) => {
      const rect = slide.getBoundingClientRect();
      if (rect.left >= 0 && rect.right <= window.innerWidth) {
        index = idx;
      }
    });
    setPodcastIndex(index);
    setShowPodcastPrev(index > 0);
    setShowPodcastNext(index < data.podcast.length - 1);
  };

  const handleBlogsBtn = (direction) => {
    const container = blogsContainer.current;
    if (!container || !data?.blogs) return;
    const slides = Array.from(container.children);
    let newIndex = blogsIndex;
    if (direction === "prev" && blogsIndex > 0) {
      newIndex = blogsIndex - 1;
    } else if (direction === "next" && blogsIndex < data.blogs.length - 1) {
      newIndex = blogsIndex + 1;
    }

    if (slides[newIndex]) {
      container.scrollTo({
        left: slides[newIndex].offsetLeft,
        behavior: "smooth",
      });
      setBlogsIndex(newIndex);
      setShowBlogsPrev(newIndex > 0);
      setShowBlogsNext(newIndex < data.blogs.length - 1);
    }
  };

  const handlePodcastBtn = (direction) => {
    const container = podcastContainer.current;
    if (!container || !data?.podcast) return;
    const slides = Array.from(container.children);
    let newIndex = podcastIndex;
    if (direction === "prev" && podcastIndex > 0) {
      newIndex = podcastIndex - 1;
    } else if (direction === "next" && podcastIndex < data.podcast.length - 1) {
      newIndex = podcastIndex + 1;
    }

    if (slides[newIndex]) {
      container.scrollTo({
        left: slides[newIndex].offsetLeft,
        behavior: "smooth",
      });
      setPodcastIndex(newIndex);
      setShowPodcastPrev(newIndex > 0);
      setShowPodcastNext(newIndex < data.podcast.length - 1);
    }
  };

  const formatDesc = (desc) => {
    if (!desc) return null;
    return desc.split("\n").map((para, i) => (
      <React.Fragment key={i}>
        {i > 0 && <br />}
        {para}
      </React.Fragment>
    ));
  };

  return (
    <div id="main-content" style={{ display: "block" }}>
      {/* Header */}
      <header>
        <img
          className="ieee-logo icon"
          src={getThemeSrc("/images/ieeelogo-dark.svg")}
          alt="IEEE Logo"
        />
        <img
          className="ieee-logo-mobile icon"
          src={getThemeSrc("/images/ieeelogo-dark-mobile.svg")}
          alt="IEEE Logo"
        />

        {/* Desktop Header Shapes */}
        <img
          className="left-circle shape desktop-shape"
          src={getThemeSrc("/images/header-shapes/left-circle-dark.svg")}
          alt=""
        />
        <img
          className="top-square shape desktop-shape"
          src={getThemeSrc("/images/header-shapes/top-square-dark.svg")}
          alt=""
        />
        <img
          className="top-triangle shape desktop-shape"
          src={getThemeSrc("/images/header-shapes/top-triangle-dark.svg")}
          alt=""
        />
        <img
          className="top-semicircle shape desktop-shape"
          src={getThemeSrc("/images/header-shapes/top-semicircle-dark.svg")}
          alt=""
        />
        <img
          className="right-semicircle shape desktop-shape"
          src={getThemeSrc("/images/header-shapes/right-semicircle-dark.svg")}
          alt=""
        />
        <img
          className="right-rings shape desktop-shape"
          src={getThemeSrc("/images/header-shapes/right-rings-dark.svg")}
          alt=""
        />
        <img
          className="center-triangle shape desktop-shape"
          src={getThemeSrc("/images/header-shapes/center-triangle-dark.svg")}
          alt=""
        />
        <img
          className="center-square shape desktop-shape"
          src={getThemeSrc("/images/header-shapes/center-square-dark.svg")}
          alt=""
        />
        <img
          className="center-bigsquare shape desktop-shape"
          src={getThemeSrc("/images/header-shapes/center-bigsquare-dark.svg")}
          alt=""
        />
        <img
          className="center-bottomtriangle shape desktop-shape"
          src={getThemeSrc(
            "/images/header-shapes/center-bottomtriangle-dark.svg",
          )}
          alt=""
        />

        {/* Mobile Header Shapes */}
        <img
          className="top-square-mobile shape mobile-shape"
          src={getThemeSrc("/images/header-shapes/top-square-dark-mobile.svg")}
          alt=""
        />
        <img
          className="top-triangle-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/header-shapes/top-triangle-dark-mobile.svg",
          )}
          alt=""
        />
        <img
          className="right-semicircle-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/header-shapes/right-semicircle-dark-mobile.svg",
          )}
          alt=""
        />
        <img
          className="bottom-rings-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/header-shapes/bottom-rings-dark-mobile.svg",
          )}
          alt=""
        />
        <img
          className="center-triangle-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/header-shapes/center-triangle-dark-mobile.svg",
          )}
          alt=""
        />
        <img
          className="bottom-triangle-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/header-shapes/bottom-triangle-dark-mobile.svg",
          )}
          alt=""
        />
        <img
          className="center-square-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/header-shapes/center-square-dark-mobile.svg",
          )}
          alt=""
        />
        <img
          className="bottom-square-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/header-shapes/bottom-square-dark-mobile.svg",
          )}
          alt=""
        />
      </header>

      {/* About Section */}
      <section id="about">
        <h1>About Us</h1>
        <p>
          Here at IEEE VIT, we strive to uphold IEEE's mission statement - to
          foster technical innovation and excellence for the benefit of
          humanity. Our members regularly bring home numerous laurels and
          accolades from national and international hackathons. No matter the
          season, you'll always find us juggling multiple projects and
          orchestrating a diversity of events from the ground up.
          <br />
          <br />
          We cover a wide range of domains including -
        </p>

        <div className="domains">
          {data?.domains?.map((domain, i) => (
            <div className="domain" key={i}>
              <img
                src={`/images/domains/${domain.domain_icon}`}
                alt={domain.domain_name}
                className="domain-icon"
              />
              <div className="domain-text">{domain.domain_name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TechLoop Section */}
      <section id="techloop">
        <img
          src={getThemeSrc("/images/shapes/techloop_top_circle_light.svg")}
          alt=""
          className="techloop-top-circle shape"
        />
        <img
          src={getThemeSrc("/images/shapes/techloop_bottom_circle_light.svg")}
          alt=""
          className="techloop-bottom-circle shape"
        />
        <img
          src={getThemeSrc("/images/shapes/techloop_triangle_light.svg")}
          alt=""
          className="techloop-triangle shape"
        />
        <img
          src={getThemeSrc(
            "/images/shapes/techloop_top_circle_light_mobile.svg",
          )}
          alt=""
          className="techloop-top-circle-mobile shape"
        />
        <img
          src={getThemeSrc(
            "/images/shapes/techloop_bottom_circle_light_mobile.svg",
          )}
          alt=""
          className="techloop-bottom-circle-mobile shape"
        />
        <img
          src={getThemeSrc("/images/shapes/techloop_triangle_light_mobile.svg")}
          alt=""
          className="techloop-triangle-mobile shape"
        />
        <h1>Techloop</h1>
        <p>
          TechLoops are interactive workshops involving hands-on sessions that
          result in stronger understanding of concepts for both the speakers and
          the audience. We conduct TechLoops with the aim of cultivating
          technical skills among students.
        </p>

        <div className="carousel">
          <div
            className="previous"
            onClick={() => handleScrollPrev(techloopScrollContainer)}
          >
            &lt;
          </div>
          <div className="container" ref={techloopScrollContainer}>
            {data?.techloop?.map((slide, i) => (
              <div className="slide" key={i}>
                <img src={slide.image} alt={slide.title} />
                <div className="content">
                  <h2>{slide.title}</h2>
                  <p>{formatDesc(slide.desc)}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="next"
            onClick={() => handleScrollNext(techloopScrollContainer)}
          >
            &gt;
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events">
        <img
          src={getThemeSrc("/images/shapes/events_left_triangle1_light.svg")}
          alt=""
          className="events-left-triangle1 shape"
        />
        <img
          src={getThemeSrc("/images/shapes/events_left_triangle2_light.svg")}
          alt=""
          className="events-left-triangle2 shape"
        />
        <img
          src={getThemeSrc("/images/shapes/events_right_triangle1_light.svg")}
          alt=""
          className="events-right-triangle1 shape"
        />
        <img
          src={getThemeSrc("/images/shapes/events_right_triangle2_light.svg")}
          alt=""
          className="events-right-triangle2 shape"
        />
        <img
          src={getThemeSrc("/images/shapes/events_bottom_triangle_light.svg")}
          alt=""
          className="events-bottom-triangle shape"
        />
        <img
          src={getThemeSrc("/images/shapes/events_triangle_light_mobile.svg")}
          alt=""
          className="events-triangle-mobile shape"
        />
        <h1>Our events</h1>
        <p>
          Over the course of a year, we conduct a multitude of events spanning a
          broad spectrum of domains. These events serve as an opportunity for
          participants to hone their skills and give us the chance to learn
          along the way.
        </p>

        <div className="carousel">
          <div
            className="previous"
            onClick={() => handleScrollPrev(eventsScrollContainer)}
          >
            &lt;
          </div>
          <div className="container" ref={eventsScrollContainer}>
            {data?.events?.map((slide, i) => (
              <div className="slide" key={i}>
                <img src={slide.image} alt={slide.title} />
                <div className="content">
                  <h2>{slide.title}</h2>
                  <p>{formatDesc(slide.desc)}</p>
                </div>
              </div>
            ))}
          </div>
          <div
            className="next"
            onClick={() => handleScrollNext(eventsScrollContainer)}
          >
            &gt;
          </div>
        </div>
      </section>

      <section id="blogs-mid">
        <div className="blogs-mid"></div>
      </section>

      <section id="blogs">
        <section id="blogs1">
          <h1>Blogs</h1>
        </section>
        <p>
          Check out the blogs from IEEE-VIT members that cover a range of
          tech-related topics and provide the right guidance you need.
        </p>
        <div className="carousel">
          <div
            className="previous"
            onClick={() => handleBlogsBtn("prev")}
            style={{
              opacity: showBlogsPrev ? 1 : 0,
              cursor: showBlogsPrev ? "pointer" : "default",
            }}
          >
            &lt;
          </div>
          <div
            className="container"
            ref={blogsContainer}
            onScroll={updateBlogsButtons}
          >
            {data?.blogs?.map((slide, i) => (
              <div
                className={`slide ${i === blogsIndex ? "current" : ""}`}
                key={i}
              >
                <img src={slide.image} alt={slide.title} />
                <div className="content">
                  <h2>{slide.title}</h2>
                  <p>{slide.desc}</p>
                </div>
                {slide.link && (
                  <a
                    href={slide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more"
                  >
                    read more
                  </a>
                )}
              </div>
            ))}
          </div>
          <div
            className="next"
            onClick={() => handleBlogsBtn("next")}
            style={{
              opacity: showBlogsNext ? 1 : 0,
              cursor: showBlogsNext ? "pointer" : "default",
            }}
          >
            &gt;
          </div>
        </div>
      </section>

      <section id="podcast">
        <h1>Podcast</h1>
        <p>
          Check out our podcast series that covers a range of tech-related
          topics and provide a unique opportunity to learn from seasoned
          professionals and stay up-to-date on the latest trends in technology.
        </p>
        <div className="carousel">
          <div
            className="previous"
            onClick={() => handlePodcastBtn("prev")}
            style={{
              opacity: showPodcastPrev ? 1 : 0,
              cursor: showPodcastPrev ? "pointer" : "default",
            }}
          >
            &lt;
          </div>
          <div
            className="container"
            ref={podcastContainer}
            onScroll={updatePodcastButtons}
          >
            {data?.podcast?.map((slide, i) => (
              <div
                className={`slide ${i === podcastIndex ? "current" : ""}`}
                key={i}
              >
                <img src={slide.image} alt={slide.title} />
                <div className="content">
                  <h2>{slide.title}</h2>
                  <p>{slide.desc}</p>
                </div>
                {slide.link && (
                  <a
                    href={slide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="read-more"
                  >
                    read more
                  </a>
                )}
              </div>
            ))}
          </div>
          <div
            className="next"
            onClick={() => handlePodcastBtn("next")}
            style={{
              opacity: showPodcastNext ? 1 : 0,
              cursor: showPodcastNext ? "pointer" : "default",
            }}
          >
            &gt;
          </div>
        </div>
      </section>

      <section id="board" className="board-section">
        <img
          className="board-rings shape desktop-shape"
          src={getThemeSrc("/images/board-shapes/board-rings-light.svg")}
          alt=""
        />
        <img
          className="board-square1 shape desktop-shape"
          src={getThemeSrc("/images/board-shapes/board-square1-light.svg")}
          alt=""
        />
        <img
          className="board-square2 shape desktop-shape"
          src={getThemeSrc("/images/board-shapes/board-square2-light.svg")}
          alt=""
        />
        <img
          className="board-square3 shape desktop-shape"
          src={getThemeSrc("/images/board-shapes/board-square3-light.svg")}
          alt=""
        />
        <img
          className="board-square4 shape desktop-shape"
          src={getThemeSrc("/images/board-shapes/board-square4-light.svg")}
          alt=""
        />
        <img
          className="board-square5 shape desktop-shape"
          src={getThemeSrc("/images/board-shapes/board-square5-light.svg")}
          alt=""
        />
        <img
          className="board-square6 shape desktop-shape"
          src={getThemeSrc("/images/board-shapes/board-square6-light.svg")}
          alt=""
        />

        <img
          className="board-square1-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/board-shapes/board-square1-light-mobile.svg",
          )}
          alt=""
        />
        <img
          className="board-square2-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/board-shapes/board-square2-light-mobile.svg",
          )}
          alt=""
        />
        <img
          className="board-square3-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/board-shapes/board-square3-light-mobile.svg",
          )}
          alt=""
        />
        <img
          className="board-square4-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/board-shapes/board-square4-light-mobile.svg",
          )}
          alt=""
        />
        <img
          className="board-square5-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/board-shapes/board-square5-light-mobile.svg",
          )}
          alt=""
        />
        <img
          className="board-square6-mobile shape mobile-shape"
          src={getThemeSrc(
            "/images/board-shapes/board-square6-light-mobile.svg",
          )}
          alt=""
        />

        <h1 style={{ textAlign: "center" }}>Executive Board</h1>
        <div
          className="board-members"
          style={{ gridTemplateColumns: `repeat(${boardColumns}, 185px)` }}
        >
          {boardData.map((member, i) => (
            <div className="board-member animate-card" key={i}>
              <img
                src={`/images/alumni-board/2025-26/${member.img}.jpg`}
                alt={member.name}
              />
              <div className="content">
                <div className="position">{member.pos}</div>
                <div className="name">{member.name}</div>
              </div>
            </div>
          ))}
        </div>

        <a
          href="/alumni"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/alumni");
          }}
        >
          Alumni board <img src="/images/alumini-arrow.svg" alt="" />
        </a>
      </section>
    </div>
  );
}
