import { getAllPosts } from "../../services/postService.js";
import "./Posts.css";
import { useState, useEffect } from "react";
import { getAllTopics } from "../../services/topicService.js";

export const AllPosts = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [allTopics, setAllTopics] = useState([]);
  const [topicSelection, setTopicSelection] = useState("0");
  let [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllPosts().then((postsArray) => {
      setAllPosts(postsArray);
      console.log("posts set!");
    });
  }, []);

  useEffect(() => {
    getAllTopics().then((topicsArray) => {
      setAllTopics(topicsArray);
      console.log("topics set!");
    });
  }, []);

  useEffect(() => {
    const foundPosts = allPosts.filter((post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPosts(foundPosts);
  }, [searchTerm, allPosts]);

  useEffect(() => {
    const filterPostsByTopic = () => {
      return topicSelection === "0"
        ? allPosts
        : allPosts.filter((post) => post.topicId === parseInt(topicSelection));
    };
    setFilteredPosts(filterPostsByTopic);
  }, [topicSelection, allPosts]);

  // filteredPosts =
  //   topicSelection === "0"
  //     ? allPosts
  //     : allPosts.filter((post) => post.topicId === parseInt(topicSelection));

  return (
    <div className="posts-container">
      <h2>Posts</h2>
      <div className="filter-bar">
        <select
          className="topic-select"
          id="topic"
          value={topicSelection}
          onChange={(event) => {
            setTopicSelection(event.target.value);
          }}
        >
          <option value="0">Select a topic</option>
          {allTopics.map((topic) => {
            return (
              <option value={topic.topicId} key={topic.topicId}>
                {topic.name}
              </option>
            );
          })}
        </select>
        <input
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          type="text"
          placeholder="Search Posts"
          className="post-search"
        />
      </div>
      <article className="posts">
        {filteredPosts.map((post) => {
          return (
            <section className="post" key={post.id}>
              <p className="post-topic">{post.topicId}</p>
              <header className="post-info">{post.title}</header>
              <footer className="post-likes">Likes #:{}</footer>
            </section>
          );
        })}
      </article>
    </div>
  );
};
