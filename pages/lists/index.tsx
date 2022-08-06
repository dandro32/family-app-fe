import React, { useEffect } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { observer } from "mobx-react-lite";
import { NextPage, NextPageContext } from "next";

import CardItem from "../../src/components/card/card";
import ListDrawer from "../../src/components/ListDrawer";
import PageLayout from "../../src/components/pageLayout";
import {
  checkIfListIsDone,
  useBoolean,
  withAuth,
} from "../../src/shared/utils";
import { useStores } from "../../src/store";
import PageLoader from "../../src/components/pageLoader";

const ListsPage: NextPage = observer(() => {
  const {
    auth: { fetchUsers },
    lists: { fetchLists, lists: listItems, listsAreLoading },
    listDetails: { setId },
  } = useStores();
  const [isOpen, openDrawer, closeDrawer] = useBoolean(false);

  const handleClick = async (_id: string) => {
    setId(_id);
    openDrawer();
  };

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

  const renderCards = listItems.map(({ _id, title, done, tasks }) => {
    const isDone = Boolean(done) || checkIfListIsDone(tasks);

    return (
      <CardItem
        key={`card-${_id}`}
        title={title}
        _id={_id}
        done={isDone}
        tasksNumber={tasks.length}
        onClick={handleClick}
      />
    );
  });

  return (
    <>
      <ListDrawer isOpen={isOpen} closeDrawer={closeDrawer} />
      <PageLayout title="Lists Portfolio">
        {!listsAreLoading && (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-around",
            }}
          >
            {renderCards}
          </div>
        )}
        {listsAreLoading && <PageLoader size={70} />}
      </PageLayout>
      <Fab
        color="primary"
        onClick={openDrawer}
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </>
  );
});

export default withAuth(ListsPage);
