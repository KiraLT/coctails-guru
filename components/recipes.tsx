import { Row, Col } from "react-bootstrap";
import { Recipe } from "../controllers/recipes";
import Image from 'next/image'
import Link from 'next/link'

export function Recipes({
    recipes
}: {
    recipes: Recipe[]
}): JSX.Element {
    return <Row>
    {recipes.map((recipe) => (
      <Col key={recipe.id} xs={12} sm={6} md={4} >
        <div className="single-best-receipe-area mb-30" >
          <Link href={recipe.url} legacyBehavior>
            <a>
              <div style={{position: 'relative', height: '300px'}}>
                <Image src={recipe.image} alt={recipe.name} layout='fill' objectFit='cover' />
              </div>
              <div className="receipe-content">
                <h5>{recipe.name}</h5>
              </div>
            </a>
          </Link>
        </div>
      </Col>
    ))}
  </Row>
}