import React from "react";

import { AuthProvider } from "./src/components/auth";

export const wrapRootElement = ({ element }) => <AuthProvider>{element}</AuthProvider>;
