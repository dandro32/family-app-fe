import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { NextPage } from "next";

import { useStores } from "../../src/store";
import PageLoader from "../../src/components/pageLoader";
import { withAuth } from "../../src/shared/utils";
import PageLayout from "../../src/components/pageLayout";
import AllListsItem from "../../src/components/all-lists-item";

import styled from "@emotion/styled";
const ListsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const AllListsPage: NextPage = observer(() => {
  const {
    auth: { fetchUsers },
    lists: { fetchLists, lists, listsAreLoading },
  } = useStores();

  useEffect(() => {
    const fetchData = async () => {
      await fetchLists();
    };

    const fetchAvailableUsers = async () => {
      await fetchUsers();
    };

    fetchData();
    fetchAvailableUsers();
  }, []);

  const renderListItems = lists.map((listItem) => {
    <AllListsItem key={`list-item-${listItem._id}`} list={listItem} />;
  });

  console.log(renderListItems);

  return (
    <PageLayout title="All lists">
      {!listsAreLoading && <ListsWrapper>{renderListItems}</ListsWrapper>}
      {listsAreLoading && <PageLoader size={70} />}
    </PageLayout>
  );
});

export default withAuth(AllListsPage);
