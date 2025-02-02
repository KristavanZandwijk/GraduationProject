import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import WidgetWrapper from "components/WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";

const MyPostWidget = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [post, setPost] = useState("");
  const theme = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = theme.palette.neutral.mediumMain;
  const medium = theme.palette.neutral.medium;

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", post);
    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`http://localhost:5001/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const posts = await response.json();
    dispatch(setPosts({ posts }));
    setImage(null);
    setPost("");
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.neutral.main,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
        acceptedFiles=".jpg,.jpeg,.png,.ifc,.mp4"  // Include .mp4 here
        multiple={false}
        onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}  // You might want to rename `setImage` to something more generic like `setFile`
      >
        {({ getRootProps, getInputProps }) => (
          <FlexBetween>
            <Box
              {...getRootProps()}
              border={`2px dashed ${theme.palette.secondary.main}`}
              p="1rem"
              width="100%"
              sx={{ "&:hover": { cursor: "pointer" } }}
            >
              <input {...getInputProps()} />
              {!image ? (  // You might want to rename `image` to something more generic like `file`
                <p>Add Image or Video Here</p>  // Update the placeholder text
              ) : (
                <FlexBetween>
                  <Typography>{image.name}</Typography>  // Similarly, this should refer to `file.name`
                  <EditOutlined />
                </FlexBetween>
              )}
            </Box>
            {image && (
              <IconButton
                onClick={() => setImage(null)}  // Again, consider renaming to `setFile(null)`
                sx={{ width: "15%" }}
              >
                <DeleteOutlined />
              </IconButton>
            )}
          </FlexBetween>
        )}
      </Dropzone>

        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" } } />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: theme.palette.secondary[200] }} />
          <Typography
            color={theme.palette.secondary[200]}
            sx={{ "&:hover": { cursor: "pointer", color: theme.palette.secondary.main } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: theme.palette.secondary[200] }} />
              <Typography color={theme.palette.secondary[200]}>Attachment</Typography>
            </FlexBetween>

          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: theme.palette.secondary.main }} />
          </FlexBetween>
        )}

        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.background.alt,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default MyPostWidget;