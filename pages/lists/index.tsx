import React from "react";

const ListsPage = () => {
  return <div>here will be lists tiles</div>;
};

export async function getServerSideProps({ ...rest }) {
  console.log("test", rest);
  // Fetch data from external API
  // const res = await fetch(`https://.../data`);
  // const data = await res.json();

  // // Pass data to the page via props
  // return { props: { data } };
  return { props: {} };
}

export default ListsPage;
