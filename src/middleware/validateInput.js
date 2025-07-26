// function validateRequest(schema) {
//     return (req, res, next) => {
//         try {
//             // Only extract the parts the schema may be expecting
//             const toValidate = {
//                 body: req.body,
//                 query: req.query,
//                 params: req.params,
//                 headers: req.headers,
//             };

//             const result = schema.validate(toValidate, {
//                 allowUnknown: true,
//                 convert: true,
//             });

//             if (result.error) {
//                 return res.status(400).json({
//                     message: result.error.details[0].message,
//                     is_success: false,
//                 });
//             }

//             const validated = result.value;

//             // Apply validated values back to req
//             if (validated.body) req.body = validated.body;
//             if (validated.params) req.params = validated.params;
//             if (validated.headers) req.headers = validated.headers;
//             if (validated.query) {
//                 Object.assign(req.query, validated.query); // Safe here
//             }

//             return next();
//         } catch (err) {
//             console.error('Validation middleware failed:', err);
//             return res.status(500).json({
//                 message: 'Internal server error',
//                 is_success: false,
//             });
//         }
//     };
// }

const validateRequest = (schema) => {
    return (req, res, next) => {
      const validationTarget = {
        body: req.body,
        headers: req.headers,
        params: req.params,
        query: req.query
      };
  
      const { error } = schema.validate(validationTarget, { allowUnknown: true });
  
      if (error) {
        return res.status(400).send({ error: error.details[0].message });
      }
  
      next();
    };
  };
  
export { validateRequest };  