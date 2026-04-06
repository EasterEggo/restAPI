const router = require('express').Router()
const { viewFull, delById, insertData, viewId } = require('../controllers/cnpqControllers')

router.get('/', viewFull)
router.post('/', insertData)
router.get('/:id', viewId)
router.delete('/:id', delById)

module.exports = router
