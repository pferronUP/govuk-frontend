import express from 'express'
import { body, validationResult } from 'express-validator'

import { formatValidationErrors } from '../../../utils.mjs'

const router = express.Router()

router.post(
  '/what-was-the-last-country-you-visited',

  body('last-visited-country')
    .exists()
    .not()
    .isEmpty()
    .withMessage('Enter the last country you visited'),

  (req, res) => {
    const viewPath =
      './full-page-examples/what-was-the-last-country-you-visited'
    const errors = formatValidationErrors(validationResult(req))

    if (!errors) {
      return res.render(`${viewPath}/confirm`)
    }

    res.render(`${viewPath}/index`, {
      errors,
      errorSummary: Object.values(errors),
      values: req.body // In production this should sanitized.
    })
  }
)

export default router
