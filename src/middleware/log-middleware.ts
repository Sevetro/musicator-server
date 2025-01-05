import { RequestHandler } from "express";

export const logMiddleware: RequestHandler = (req, res, next) => {
  console.log(`req.baseUrl: `, req.baseUrl);
  console.log(`-------------------------------------------------`);

  console.log(`req.body: `, req.body);
  console.log(`-------------------------------------------------`);

  console.log(`req.fresh: `, req.fresh);
  console.log(`-------------------------------------------------`);

  console.log(`req.headers: `, req.headers);
  console.log(`-------------------------------------------------`);

  console.log(`req.hostname: `, req.hostname);
  console.log(`-------------------------------------------------`);

  console.log(`req.httpVersion: `, req.httpVersion);
  console.log(`-------------------------------------------------`);

  console.log(`req.ip: `, req.ip);
  console.log(`-------------------------------------------------`);

  console.log(`req.ips: `, req.ips);
  console.log(`-------------------------------------------------`);

  console.log(`req.method: `, req.method);
  console.log(`-------------------------------------------------`);

  console.log(`req.originalUrl: `, req.originalUrl);
  console.log(`-------------------------------------------------`);

  console.log(`req.params: `, req.params);
  console.log(`-------------------------------------------------`);

  console.log(`req.path: `, req.path);
  console.log(`-------------------------------------------------`);

  console.log(`req.protocol: `, req.protocol);
  console.log(`-------------------------------------------------`);

  console.log(`req.route: `, req.route);
  console.log(`-------------------------------------------------`);

  console.log(`req.secure: `, req.secure);
  console.log(`-------------------------------------------------`);

  console.log(`req.subdomains: `, req.subdomains);
  console.log(`-------------------------------------------------`);

  console.log(`req.url: `, req.url);
  console.log(`-------------------------------------------------`);

  next();
};
