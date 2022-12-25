import type { GetStaticProps, NextPage, GetStaticPaths } from 'next'
import type { ParsedUrlQuery } from 'querystring'
import Image from 'next/image'

import { Layout } from '../../components/layout'
import { RawRecipe, Recipe } from '../../controllers/recipes'

export interface Props {
    rawRecipe: RawRecipe
}

export interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticProps: GetStaticProps<Props, Params> = (context) => {
    return {
        props: {
          rawRecipe: Recipe.fromSlug(context.params?.slug!)!.serialize()
        }
    }
}

export const getStaticPaths: GetStaticPaths<Params> = () =>  {
    return {
      paths: Recipe.getAll().map(v => ({
        params: {
          slug: v.slug
        }
      })),
      fallback: false
    }
}

const Page: NextPage<Props> = ({ rawRecipe }) => {
  const recipe = new Recipe(rawRecipe)

  return (
    <Layout title={recipe.name}>
      <>
        <div className="receipe-content-area">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-8">
                <div className="receipe-headline my-5">
                  <h2>{recipe.name}</h2>
                  {/* <div className="receipe-duration">
                    <h6>Prep: 15 mins</h6>
                    <h6>Cook: 30 mins</h6>
                    <h6>Yields: 8 Servings</h6>
                  </div> */}
                </div>
                {recipe.instructions.map((v, i) => <>
                  <div className="single-preparation-step d-flex" key={i}>
                    <h4>{i + 1}.</h4>
                    <p>{v}</p>
                  </div>
                </>)}
              </div>
              <div className="col-12 col-lg-4">
                <div style={{position: 'relative', height: '250px'}} className="mb-3 mt-3">
                  <Image src={recipe.image} alt="" layout='fill' objectFit='cover'/>
                </div>
                <div className="ingredients">
                  <h4>Ingredients</h4>
                  {recipe.ingredients.map((ingredient, i) => <div className="custom-control custom-checkbox" key={i}>
                    <input type="checkbox" className="custom-control-input" id={`ingredient-${i}`} />
                    <label className="custom-control-label" htmlFor={`ingredient-${i}`}>{ingredient.getRepresentation()}</label>
                  </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </Layout>
  )
}

export default Page