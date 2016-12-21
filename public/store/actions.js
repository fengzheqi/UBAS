/**
 * @file
 * @author tommyzqfeng
 * @date 2016/12/12
 */
import * as types from './mutation-types'

export const addToCart = ({commit}, product) => {
  if (product.inventory >0) {
    commit(types.ADD_TO_CART, {
      id: product.id
    })
  }
}