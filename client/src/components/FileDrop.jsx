// client/src/components/FileDrop.jsx
import {
  EditOutlined,
  DeleteOutlined,
  PublishOutlined,
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
import { setFiles } from "state";

const FileDrop = ({ picturePath }) => {
  const dispatch = useDispatch();
  const [isData, setIsData] = useState(false);
  const [data, setData] = useState(null);
  const [description, setDescription] = useState("");
  const theme = useTheme();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = theme.palette.neutral.mediumMain;
  const medium = theme.palette.neutral.medium;

  const generateFileID = () => {
    return Math.random().toString(36).substr(2, 10).toUpperCase();
  };

  const handleFile = async () => {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", description);
    if (data) {
      formData.append("data", data);
      formData.append("filePath", data.name);
      formData.append("fileID", generateFileID());
    }

    const response = await fetch(`http://localhost:5001/files`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const files = await response.json();
    dispatch(setFiles({ files }));
    setData(null);
    setDescription(""); // Clear description after file upload
  };

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="Add a description to your files"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          sx={{
            width: "100%",
            backgroundColor: theme.palette.secondary.default,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            border: `2px solid ${theme.palette.secondary.main}`, // use backticks for template literals
          }}
        />

      </FlexBetween>
      {isData && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"
        >
          <Dropzone
            acceptedFiles=".jpg,.jpeg,.png,.gif,.bmp,.tiff,.webp,
                          .pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.rtf,.odt,.ods,.odp,
                          .mp3,.wav,.ogg,.m4a,.flac,
                          .mp4,.mov,.wmv,.avi,.mkv,.webm,.flv,
                          .zip,.rar,.7z,.tar,.gz,
                          .html,.css,.js,.ts,.json,.xml,.yaml,.yml,.csv,.md,.sql,
                          .ifc,.obj,.stl,.fbx,.dae,.3ds,.gltf,.glb"
            multiple={false}
            onDrop={(acceptedFiles) => setData(acceptedFiles[0])}
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
                  {!data ? (
                    <p>Add File Here. Only one at a time!</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{data.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {data && (
                  <IconButton
                    onClick={() => setData(null)}
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

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsData(!isData)}>
          <PublishOutlined sx={{ color: theme.palette.secondary[200] }} />
          <Typography
            color={theme.palette.secondary[200]}
            sx={{ "&:hover": { cursor: "pointer", color: theme.palette.secondary.main } }}
          >
            Add Data
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: theme.palette.secondary.main }} />
          </FlexBetween>
        )}

        <Button
          disabled={!description && !data}
          onClick={handleFile}
          sx={{
            color: theme.palette.secondary.main,
            backgroundColor: theme.palette.background.alt,
            borderRadius: "3rem",
          }}
        >
          UPLOAD
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default FileDrop;
