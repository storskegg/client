// @flow
import * as I from 'immutable'
import * as Constants from '../../constants/profile2'
import * as Avatar from '../../desktop/remote/sync-avatar-props.desktop'

export const serialize: any = {
  ...Avatar.serialize,
  assertions: v => (v ? v.toJS() : v),
  bio: v => v,
  followThem: v => v,
  followersCount: v => v,
  followingCount: v => v,
  followsYou: v => v,
  fullname: v => v,
  guiID: v => v,
  location: v => v,
  onAccept: v => v,
  onChat: v => v,
  onClose: v => v,
  onFollow: v => v,
  onIgnoreFor24Hours: v => v,
  publishedTeams: v => v,
  reason: v => v,
  state: v => v,
  username: v => v,
  waiting: v => v,
  windowComponent: v => v,
  windowOpts: v => v,
  windowParam: v => v,
  windowPositionBottomRight: v => v,
  windowTitle: v => v,
}

const initialState = {
  assertions: I.Map(),
  config: {},
  users: {
    infoMap: I.Map(),
  },
  waiting: {
    counts: I.Map(),
  },
}

export const deserialize = (state: any = initialState, props: any) => {
  console.log('aaaa deserialize', state, props)
  const newState = {
    ...state,
    ...props,
    ...(props && props.assertions
      ? {
          assertions: I.Map(
            Object.keys(props.assertions).map(assertionKey => [
              assertionKey,
              Constants.makeAssertion(props.assertions[assertionKey]),
            ])
          ),
        }
      : {}),
    ...(props && props.username
      ? {
          users: {
            infoMap: I.Map([[props.username, {broken: false, fullname: props.fullname}]]),
          },
        }
      : {}),
    ...(props && props.hasOwnProperty('waiting')
      ? {
          waiting: {
            counts: I.Map([[Constants.waitingKey, props.waiting || 0]]),
          },
        }
      : {}),
  }
  return Avatar.deserialize(newState, props)
}