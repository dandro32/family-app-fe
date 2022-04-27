import React, { useEffect } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import CardItem from "../../src/components/card/card";
import ListDrawer from "../../src/components/ListDrawer";
import PageLayout from "../../src/components/pageLayout";
import { useBoolean, withAuth } from "../../src/shared/utils";
import { useStores } from "../../src/store";
import PageLoader from "../../src/components/pageLoader";

const ListsPage = () => {
  const { lists: listsStore } = useStores();
  const [isOpen, openDrawer, closeDrawer] = useBoolean(false);

  const handleClick = (_id: string) => {
    openDrawer();
  };

  useEffect(() => {
    const fetchData = async () => {
      await listsStore.fetchLists();
    };

    fetchData();
  }, []);

  const renderCards = listsStore.lists.map(({ _id, title, done, tasks }) => (
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
    <>
      <ListDrawer isOpen={isOpen} closeDrawer={closeDrawer} />
      <PageLayout title="Lists Portfolio">
        {!listsStore.listsAreLoading && (
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
        {listsStore.listsAreLoading && <PageLoader />}
      </PageLayout>
      <Fab
        color="primary"
        onClick={openDrawer}
        sx={{ position: "absolute", bottom: 16, right: 16 }}
      >
        <AddIcon />
      </Fab>
    </>
  );
};

export default withAuth(ListsPage);
