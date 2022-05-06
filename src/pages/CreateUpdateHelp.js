import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  Container,
  Grid,
  Typography,
  Paper,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  FormControl,
  FormHelperText,
  LinearProgress,
} from "@mui/material";
import { useFormik } from "formik";
import CategoriesDropdown from "../Components/CategoriesDropdown";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import parse from "html-react-parser";
import AxiosInstance from "../AxiosInstance";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { useParams, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import RenderTemplate from "../Components/RenderTemplate";
import NoPermission from "../Components/NoPermission";

const editorConfiguration = {
  toolbar: {
    items: [
      "heading",
      "|",
      "fontfamily",
      "fontsize",
      "|",
      "alignment",
      "|",
      "fontColor",
      "fontBackgroundColor",
      "|",
      "bold",
      "italic",
      "strikethrough",
      "underline",
      "subscript",
      "superscript",
      "|",
      "link",
      "|",
      "outdent",
      "indent",
      "|",
      "bulletedList",
      "numberedList",
      "todoList",
      "|",
      "code",
      "codeBlock",
      "|",
      "insertTable",
      "|",
      "blockQuote",
      "|",
      "undo",
      "redo",
    ],
    shouldNotGroupWhenFull: true,
  },
};

function CreateUpdateHelp() {
  const history = useHistory();
  const { help_slug } = useParams();
  const user = useSelector((state) => state.user);
  const [isOwner, setIsOwner] = useState(false);
  const [title, setTitle] = useState("Create New Help");
  const [loading, setLoading] = useState(true);
  const DonationFormValidationSchema = Yup.object().shape({
    title: Yup.string()
      .min(6, "Too Short!")
      .max(70, "Too Long!")
      .required("Title for your help is needed!"),
    description: Yup.string()
      .min(20, "Too Short!")
      .required("Short description is required."),
    location: Yup.string()
      .min(6, "Too Short!")
      .required("Please give pickup location for your help."),
    contact: Yup.string()
      .trim()
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        "Please enter a valid contact number."
      )
      .required("Please give a contact number to make your help reachable."),
  });

  const getFormData = () => {
    AxiosInstance.get(`donation/donation/${help_slug}`)
      .then((resp) => {
        let _help = resp.data;
        createDonationForm.setValues(_help);
        setIsOwner(parseInt(_help.doner.id) === parseInt(user.id));
        setTitle(`Edit ${_help.title}`);
      })
      .catch((err) => console.log(err.response))
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (help_slug !== undefined) {
      getFormData();
    } else {
      setLoading(false);
    }
  }, []);

  const formInitialValues = {
    title: "",
    category: 0,
    description: "",
    location: "",
    contact: "",
    active: false,
  };

  const url = help_slug
    ? `donation/donation/${help_slug}/`
    : `donation/donation/`;

  const HandleCreate = (values) => {
    AxiosInstance.post(url, values)
      .then((resp) => {
        createDonationForm.resetForm();
        toast.success("New Help Creation Success!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        history.replace(`/help-detail/${resp.data.slug}`);
      })
      .catch((err) => {
        createDonationForm.setErrors(err.response.data);
        for (const error_field in err.response.data) {
          toast.warning(err.response.data[error_field], {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  const HandleUpdate = (values) => {
    AxiosInstance.put(url, values)
      .then((resp) => {
        setTitle(`${resp.data.title}`);
        toast.success("Help Updated Successfully!", {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        history.replace(`/help-detail/${resp.data.slug}`);
      })
      .catch((err) => {
        createDonationForm.setErrors(err.response.data);
        for (const error_field in err.response.data) {
          toast.warning(err.response.data[error_field], {
            position: toast.POSITION.BOTTOM_CENTER,
          });
        }
      });
  };

  const createDonationForm = useFormik({
    initialValues: formInitialValues,
    onSubmit: (values, { isSubmitting }) => {
      help_slug ? HandleUpdate(values) : HandleCreate(values);
      createDonationForm.setSubmitting(false);
    },
    validationSchema: DonationFormValidationSchema,
  });
  return loading ? (
    <Container component="main" sx={{ padding: "0", marginY: 10 }}>
      <LinearProgress />
    </Container>
  ) : (
    <Container sx={{ minWidth: "90vw" }}>
      <Helmet>
        <title>{title} | Sharing is Caring</title>
      </Helmet>
      {isOwner || !help_slug ? (
        <Paper
          sx={{ minHeight: "110vh", padding: "8px", marginY: 3 }}
          fullWidth
        >
          <Typography variant="h4" component="h4" sx={{ paddingY: 1 }}>
            {title}
          </Typography>
          <Divider />
          <Grid container item spacing={2}>
            {/* <Grid
            item
            sm={12}
            md={6}
            lg={6}
            xl={6}
            sx={{ marginTop: "10px", padding: "15px" }}
          >
            <RenderTemplate />
            <Typography variant="h6">
              {createDonationForm.values.title}
            </Typography>
            <Typography variant="p">
              Category: {createDonationForm.values.category}
            </Typography>
            <Typography variant="p">
              Description: {parse(createDonationForm.values.description)}
              location: {parse(createDonationForm.values.location)}
              contact: {parse(createDonationForm.values.contact)}
              active:{" "}
              {parse(
                createDonationForm.values.active === true ? "true" : "false"
              )}
            </Typography>
          </Grid> */}
            <Grid
              item
              container
              sm={12}
              md={12}
              xl={12}
              spacing={2}
              sx={{
                display: "flex",
                flexDirection: "column",
                paddingTop: "10px",
                marginTop: "10px",
                overflow: "hidden",
              }}
            >
              <Grid item>
                <TextField
                  autoFocus
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Help Title"
                  onChange={createDonationForm.handleChange}
                  value={createDonationForm.values.title}
                  error={
                    createDonationForm.touched.title &&
                    Boolean(createDonationForm.errors.title)
                  }
                  helperText={
                    createDonationForm.touched.title &&
                    createDonationForm.errors.title
                  }
                />
              </Grid>
              <Grid item>
                {/* <FormControl fullWidth>
                <InputLabel id="categoryLabel">Category</InputLabel>
                <Select
                  labelId="categoryLabel"
                  id="category"
                  value={createDonationForm.values.category}
                  label="Category"
                  onChange={createDonationForm.handleChange}
                >
                  <MenuItem value={""}>All Categories</MenuItem>;
                  {categories.map((category) => {
                    return (
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl> */}
                <CategoriesDropdown
                  setCategoryFilter={(category) => {
                    createDonationForm.setFieldValue("category", category);
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  autoComplete=""
                  name="location"
                  required
                  fullWidth
                  id="location"
                  label="Location"
                  onChange={createDonationForm.handleChange}
                  value={createDonationForm.values.location}
                  error={
                    createDonationForm.touched.location &&
                    Boolean(createDonationForm.errors.location)
                  }
                  helperText={
                    createDonationForm.touched.location &&
                    createDonationForm.errors.location
                  }
                />
              </Grid>
              <Grid item>
                <FormControl sx={{ width: "100%" }}>
                  <CKEditor
                    editor={ClassicEditor}
                    config={editorConfiguration}
                    data={createDonationForm.values.description}
                    name="description"
                    onChange={(event, editor) => {
                      createDonationForm.setFieldValue(
                        "description",
                        editor.getData()
                      );
                    }}
                  />
                  <FormHelperText id="my-helper-text" sx={{ color: "#d32f2f" }}>
                    {createDonationForm.touched.description &&
                      createDonationForm.errors.description}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item>
                <TextField
                  autoComplete=""
                  name="contact"
                  required
                  fullWidth
                  id="contact"
                  label="Contact"
                  onChange={createDonationForm.handleChange}
                  value={createDonationForm.values.contact}
                  error={
                    createDonationForm.touched.contact &&
                    Boolean(createDonationForm.errors.contact)
                  }
                  helperText={
                    createDonationForm.touched.contact &&
                    createDonationForm.errors.contact
                  }
                />
              </Grid>
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={createDonationForm.values.active}
                      onChange={createDonationForm.handleChange}
                      name="active"
                    />
                  }
                  label="Active"
                  name="active"
                />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  sx={{ color: "white" }}
                  onClick={createDonationForm.handleSubmit}
                  disabled={createDonationForm.isSubmitting}
                >
                  {help_slug ? "Update Help" : "Create Help"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      ) : (
        <NoPermission />
      )}
    </Container>
  );
}

export default CreateUpdateHelp;
