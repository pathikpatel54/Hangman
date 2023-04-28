import {
  ActionIcon,
  Button,
  Center,
  CopyButton,
  Group,
  Input,
  Loader,
  Modal,
  Space,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";
import { IconCopy } from "@tabler/icons-react";

const Generate = () => {
  const [word, setWord] = useState("");
  const [error, setError] = useState("");
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [uri, setURI] = useState("");

  const onGenerateClick = async () => {
    if (word === "") {
      setError("Word is required");
    } else {
      setLoading(true);
      const link = await axios.post(`/api/generate`, {
        word,
      });
      setURI(`${window.location.origin}/hangman/${link.data.url}`);
      setLoading(false);
      open();
    }
  };

  const onModalClose = () => {
    setWord("");
    setError("");
    setURI("");
    setLoading(false);
    close();
  };

  return (
    <div>
      <Center>
        <Input.Wrapper
          id="input-demo"
          withAsterisk
          label="Challange word"
          description="Enter a word that you would like to challange..."
          error={error}
          w={400}
          mt={40}
        >
          <Input
            id="input-demo"
            placeholder="Your Word"
            value={word}
            onChange={(e) => {
              setError("");
              setWord(e.target.value);
            }}
            rightSection={loading ? <Loader p={5} /> : <></>}
          />
        </Input.Wrapper>
      </Center>
      <Space h="md" />
      <Center>
        <Button w={400} onClick={onGenerateClick}>
          Generate
        </Button>
      </Center>
      <Modal
        size={600}
        opened={opened}
        onClose={onModalClose}
        withCloseButton={true}
        title={<Text fw={700}>Link Generated</Text>}
      >
        <Group noWrap mt="md">
          {uri}
          <CopyButton value={uri} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip
                label={copied ? "Copied" : "Copy"}
                withArrow
                position="right"
              >
                <ActionIcon color={copied ? "teal" : "gray"} onClick={copy}>
                  {copied ? <IconCopy size="1rem" /> : <IconCopy size="1rem" />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Group>
      </Modal>
    </div>
  );
};

export default Generate;
