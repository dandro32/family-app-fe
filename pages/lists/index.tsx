import { Box } from "@mui/material";
import React from "react";
import CardItem from "../../src/components/card/card";
import PageLayout from "../../src/components/pageLayout";

const mockData = Array.from(Array(10).keys()).map((nr: number) => ({
  _id: nr + "",
  title: `list ${nr}`,
  done: Math.random() > 0.5,
  tasks: Array.from(Array(Math.floor(Math.random() * 11)).keys()),
}));

const ListsPage = () => {
  const handleClick = (_id: string) => {
    console.log(_id);
  };

  const renderCards = mockData.map(({ _id, title, done, tasks }) => (
    <CardItem
      key={`card-${_id}`}
      title={title}
      _id={_id}
      done={Boolean(done)}
      tasksNumber={tasks.length}
      onClick={handleClick}
    />
  ));

  return (
    <PageLayout title="Lists Portfolio">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {renderCards}
      </div>
    </PageLayout>
  );
};

ListsPage.getInitialProps = async () => {
  return { props: {} };
};

// export async function getServerSideProps(context: any) {
//   console.log("test", context.store);
//   // Fetch data from external API
//   // const res = await fetch(`https://.../data`);
//   // const data = await res.json();

//   // // Pass data to the page via props
//   // return { props: { data } };
//   return { props: {} };
// }

export default ListsPage;
