module.exports = {
  name: 'users'
, schema: {
    id:                 { type: 'serial', primaryKey: true }
  , facebook_id:        { type: 'integer', unique: true }
  , fb_access_token:    { type: 'text' }
  , fb_profile:         { type: 'json', default: "'{}'" }
  , created_at:         { type: 'timestamp', default: 'now()' }
  }
};