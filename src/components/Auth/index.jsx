import  { memo } from 'react';
import db from "../Database/db"

  // we using memo here

   export function  user_info()
    {
        return  db.user_info.orderBy("id").reverse().limit(1).toArray();
    }

    // Wrap component using `React.memo()` and pass `arePropsEqual`
   export const user_info = React.memo(user_info);

