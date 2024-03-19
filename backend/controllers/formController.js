export const createForm = (req, res) => {
  const { name, elements } = req.body;
  const userId = new mongoose.Types.ObjectId(req.userId);
  const newForm = new Form({
    name,
    elements: elements ?? [],
    user: userId,
  });
  newForm.save().then(function (response) {
    if (response) {
      res.status(200).json({
        status: 'success',
        data: {
          form: response,
        },
      });
    } else {
      res.status(201).json({
        status: 'error',
        message: 'Something went wrong',
      });
    }
  });
};

export const updateForm = (req, res) => {
  Form.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((response) => {
      if (response) {
        res.status(200).json({
          status: 'success',
          data: {
            form: response,
          },
        });
      } else {
        res.status(404).json({
          status: 'fail',
          message: 'No form found with that ID',
        });
      }
    })
};

export const deleteForm = (req, res) => {
 Form.findByIdAndDelete(req.params.id)
  .then ((response) => {
    if (response){
      res.status(200).json({
        status: 'success',
        data: {
          form: response,
        },
      });
    }
    else {
      res.status(404).json({
        status: 'fail',
        message: 'No form found with that ID',
      });
    }
  })

};
