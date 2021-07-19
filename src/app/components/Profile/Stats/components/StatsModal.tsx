import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Following from "./Following";
import Followers from "./Followers";
import { User as UserType } from "../../../../types";

interface StatsModalProps {
  state: StatsModalStateProps;
}

interface StatsModalStateProps {
  isOpen: boolean;
  activeTab?: number;
  onClose: () => void;
  user: Partial<UserType>;
  followers: Partial<UserType>[];
  following: Partial<UserType>[];
}

const StatsModal = ({
  state: { isOpen, onClose, activeTab, followers, following },
}: StatsModalProps) => (
  <Modal isCentered isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>User relations</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <Tabs
          colorScheme={"purple"}
          defaultIndex={activeTab}
          variant={"soft-rounded"}
        >
          <TabList>
            <Tab>Followers</Tab>
            <Tab>Following</Tab>
          </TabList>

          <TabPanels>
            <TabPanel children={<Followers followers={followers} />} />
            <TabPanel children={<Following following={following} />} />
          </TabPanels>
        </Tabs>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default StatsModal;
