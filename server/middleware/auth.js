import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {//zwykłelogowanieczyzgoogli      
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }

    next(); 
    //wykonanienasepnejakcji np.likepost 
    //want to like a post
    //click the like button 
    //auth middleware
    //like controller
  } catch (error) {
    console.log(error);
  }
};

export default auth;