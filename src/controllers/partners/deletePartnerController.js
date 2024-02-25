const ctrlWrapper = require('../../helpers/ctrlWrapper');
const path = require('path');
const fs = require('fs').promises;
const db = require('../../models');

const DIR_PARTNERS_IMAGES =
  process.env.DIR_PARTNERS_IMAGES || 'public/images/partners';

const deletePartnerController = ctrlWrapper(async (req, res) => {
  const { id } = req.params;

  const existingPartner = await db.Partners.findByPk(id);

  if (!existingPartner) {
    return res.status(404).json({ error: 'Partner not found' });
  }

    let successMessage = 'Partner successfully deleted';

    try{
     const fileName = existingPartner.image;

  if (fileName) {
    const filePath = path.join(DIR_PARTNERS_IMAGES, fileName);
    await fs.unlink(filePath);
  }
  }catch{
successMessage = 'Partner deleted, but failed to delete image'; 
  }finally{
      await existingPartner.destroy();
  }


  // const fileName = existingPartner.image;

  // if (fileName) {
  //   const filePath = path.join(DIR_PARTNERS_IMAGES, fileName);
  //   await fs.unlink(filePath);
  // }

  // await existingPartner.destroy();

  res.status(200).json({ message: successMessage });
});

module.exports = deletePartnerController;
