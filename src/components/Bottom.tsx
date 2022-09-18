import { Footer, Button } from "@mantine/core";
import { IconQuestionMark, IconBrandGithub } from "@tabler/icons";
import { Link } from "react-router-dom";

const Bottom = () => {
  return (
    <Footer
      height={60}
      p="md"
      style={{ background: "none", border: 0, zIndex: 0 }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Button
          variant="light"
          color="cyan"
          compact
          leftIcon={<IconQuestionMark size={14} />}
          component={Link}
          to="/faq"
        >
          FAQ
        </Button>
        <Button
          variant="light"
          color="violet"
          compact
          leftIcon={<IconBrandGithub size={14} />}
          component="a"
          href="https://github.com/evmla"
          target="_blank"
        >
          GitHub
        </Button>
      </div>
    </Footer>
  );
};

export default Bottom;
