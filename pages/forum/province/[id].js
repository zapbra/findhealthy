import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import Header from "../../../components/forum/Header";
import { fetchForumProvinceByName } from "../../../utils/supabaseFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
import ProvinceHolder from "../../../components/forum/province/ProvinceHolder";

const Cont = styled.div`
  background-color: ${(props) => props.colors.tan};
  padding-top: 40px;
  padding-bottom: 80px;

  .content-holder {
    background: #fff;
    width: 90%;
    margin: auto;
    border-radius: 8px;
    padding: 16px;
    border: 1px solid ${(props) => props.colors.grey};
    @media only screen and (max-width: 600px) {
      width: 100%;
      border-radius: 0px;
      padding: 0;
    }
  }
`;

export async function getServerSideProps(params) {
  const fetchProvince = await fetchForumProvinceByName(params.query.id);
  return {
    props: {
      fetchProvince,
    },
  };
}

const Province = ({ fetchProvince }) => {
  const nothing = "deleteme";
  const posts = [
    {
      title: "Why does raw meat make me feel so good?",
      username: "rawfatgod",
      replies: 42,
      views: 2323,
      date: new Date(),
      forum: "Ottawa",
      lastComment: { date: new Date(), username: "admin1" },
    },
    {
      title: "Why does raw meat make me feel so good?",
      username: "rawfatgod",
      replies: 42,
      views: 2323,
      date: new Date(),
      forum: "Ottawa",
      lastComment: { date: new Date(), username: "admin1" },
    },
    {
      title: "Why does raw meat make me feel so good?",
      username: "rawfatgod",
      replies: 42,
      views: 2323,
      date: new Date(),
      forum: "Ottawa",
      lastComment: { date: new Date(), username: "admin1" },
    },
    {
      title: "Why does raw meat make me feel so good?",
      username: "rawfatgod",
      replies: 42,
      views: 2323,
      date: new Date(),
      forum: "Ottawa",
      lastComment: { date: new Date(), username: "admin1" },
    },
    {
      title: "Why does raw meat make me feel so good?",
      username: "rawfatgod",
      replies: 42,
      views: 2323,
      date: new Date(),
      forum: "Ottawa",
      lastComment: { date: new Date(), username: "admin1" },
    },
  ];

  const router = useRouter();
  const backLink = router.query.backLink;

  return (
    <Cont colors={COLORS}>
      <div className="content-holder box-shadow-2">
        <Header />
        <div className="flex justify-end mar-bottom-16">
          <Link href={{ pathname: `/forum/country/${backLink}` }}>
            <div className="black-gradient-btn flex-inline box-shadow align-center">
              <p className="blue bold mar-right-8">Back</p>
              <FontAwesomeIcon
                icon={faArrowTurnDown}
                style={{ transform: "rotate(90deg)" }}
                className="blue icon-ssm"
              />
            </div>
          </Link>
        </div>
        <ProvinceHolder province={fetchProvince.name} posts={posts} />
      </div>
    </Cont>
  );
};

export default Province;
