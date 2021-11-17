# Math 241: Formulas and Key Concepts

*by Samarth Chitgopekar*

## Concepts Covered

---

1. [Parametric Plotting](#parametric-plotting)

2. [Vectors](#vectors)

3. [Planes](#planes)

4. [The Gradient](#the-gradient)

5. [Gauss Green and Double Integrals](#gauss-green-and-double-integrals)

## Parametric Plotting

---

### Circles and Ellipses

You can convert a rectangular function to a parametric one using:

${
    x = x(t) = cos(t)
}$

${
    y = y(t) = sin(t)
    }$

| Rectangular                                    | Parametric                                                    |
| ---------------------------------------------- | ------------------------------------------------------------- |
| ${ (\frac{x-h}{a})^2 + (\frac{y-k}{b})^2 = 1}$ | ${ P(t) = (h, k) + (a cos(t), b sin(t)); 0 \leq t \leq 2\pi}$ |

*where `{h, k}` is the center of the ellipse with a horizontal axis of length `2a` and vertical axis of length `2b`*

A parametric is not complete unless it has bounds for all of its parameters.

### Derivatives

Let ${ P(t) }$ be some parametrically defined function.

The candidates for the highest/lowest values of ${ P }$ can be found by evaluating ${ P }$ at the following ${ t }$:

1. ${ y'_P(t) = 0 }$
2. ${ y'_P(t) = \nexists }$
3. ${ t_l \,\&\, t_h \iff t_l \leq t \leq t_h}$

The candidates for the rightmost/leftmost values of ${ P }$ can be found by evaluating ${ P }$ at the following ${ t }$:

1. ${ x'_P(t) = 0 }$
2. ${ x'_P(t) = \nexists }$
3. ${ t_l \,\&\, t_h \iff t_l \leq t \leq t_h}$

The rate of change of ${ P }$ can be modeled as ${ \frac{dy}{dx} = \frac{y'(t)}{x'(t)}}$.

### Collisions vs. Intersections

Let ${ P(t) }$ and ${ S(t) }$ be some parametrically defined function.

Then the paths drawn out by ${ P(t) }$ and ${ R(t) }$ **intersect** when they get the same Cartesian coordinates, which can be expressed by the system:

${ x_P(t) = x_R(s) }$

${ y_P(t) = y_R(s) }$

The paths drawn out by ${ P(t) }$ and ${ R(t) }$ **collide** when they get the same Cartesian coordinates *at the same time*, which can be expressed by the system:

${ x_P(t) = x_R(t) }$

${ y_P(t) = y_R(t) }$

That is, ${ collisions \subset intersections}$.

### Multiple Parameters

| Term    | # of Parameters | # of Dimensions | Definition                                   |
|:-------:|:---------------:|:---------------:|:-------------------------------------------- |
| Curve   | 1               | 1               | You can trace its `length` with your finger. |
| Surface | 2               | 1               | You can paint its `area` with a paintbrush.  |
| Solid   | 3               | 2               | You can fill in its `volume` with sand.      |

${ t }$ generally ranges from ${0 \leq t \leq 2\pi}$ and is your first parameter.

${ r }$ can be used to create a surface by filling in a shape with scaled. If used for this case, it usually ranges from ${0 \leq r \leq r'}$ (where ${r'}$ is our largest "outermost" radius).

Center a parametric by adding ${(x, y, z, ..., n)}$ to it. For example a tube centered along ${ P(t) }$ with a radius of 1 and cross sections parallel to the `YZ` plane can be understood as:

${ Tube(s, t) = (0, cos(s), sin(s)) + P(t); t_l \leq t \leq t_h, 0 \leq s \leq 2\pi}$

You can also swap the location of ${sin}$ and ${cos}$, this just changes the direction the parametrization goes (counterclockwise vs clockwise).

We can also use dynamically sized radii for our tube. Say we want our radius at any `x` to be ${radius = y = \sqrt{x}}$, then:

${ Tube(x, t) = (x, 0, 0) + \sqrt{x}(0, cos(t), sin(t)); t_l \leq t \leq t_h, 0 \leq x \leq 2\pi}$

In general, you can parametrize a 3D surface by finding an expression for the center of the cross section, ${center(x)}$; an appropriate "circle setup" based on what plane the cross sections are parallel to, ${cross(s)}$; and a function to describe the radius of the cross section, ${radius(x)}$.

Put it all together (with appropriate bounds):

${ surface(s, x) = center(x) + radius(x) cross(s)}$

To describe a parametric plot, state the following:

1. Where the cross sections are centered
   - This could be on an axis or somewhere like ${(f(x), 0, 0)}$
2. What plane they're parallel to
   - An easy way to get this is as follows: look at the tuple ${(X, Y, Z)}$. The ones with a ${sin}$ or ${cos}$ are a letter in the name of the parallel plane. In the first example with ${Tube}$, the ${X}$ component is 0, so the parallel plane is the `YZ` plane.
3. The ranges of the parameters in question

## Vectors

---

### Vector Basics

A vector has both a magnitude and a direction. It should be thought of as a **force**. They do not care about their location in space.

Given points Tip = ${P}$ and Tail = ${Q}$, the vector can be understood as "Tip - Tail", or ${P - Q}$.

Let ${X}$ and ${Y}$ be vectors living in ${n}$ dimensions.

A vector has a magnitude, which represents its length.

${|X| = \sqrt{X_1^2+X_2^2+...+X_n^2}}$

${X = Y \iff |X| = |Y|}$ and ${\theta_X = \theta_Y}$

When adding two vectors, the resultant is the sum of their individual components.

When subtracting two vectors, simply add them with the subtracted vector being multiplied by a scalar `-1`.

### Parallel and Perpendicular Vectors

Two vectors are parallel if they point in the same direction. That is, they differ by a scalar multiple.

${X \parallel Y \iff \theta_X = \theta_Y}$, or ${kX = Y}$ with ${k \in \mathbb{R}}$

Therefore, the easiest way to get a parallel vector is by multiplying by a constant.

Two vectors are perpendicular (in 2 dimensions) if their `X` and `Y` components are swapped and multiplied by `-1`. They may also be multiplied by an additional positive constant.

${X \perp Y \iff X_x = -kY_y}$ and ${X_y = -kY_x}$, with ${k \in \mathbb{R}+}$

Therefore, in two dimensions, the easiest way to get a perpendicular vector is by swapping the components and multiplying by `-1`.

To find perpendicularity in ${n}$ dimensions, use the Algebraic Dot Product between the vector ${X}$ and another vector ${Y = (X, Y, Z, ..., n)}$ such that ${X \cdot Y = 0}$. Choose your own values for all of the variables except for 1. Then solve the equation.

### Lines

We can think of a parametric line given two points, ${P}$ and ${Q}$ that lie on it:
${
    L(t) = Q + t(P-Q); 0 \leq t \leq 1 || t \in \mathbb{R}
}$

Bounding this parametrization to ${0 \leq t \leq 1}$ gets us the line segment from ${P}$ to ${Q}$, whereas ${t \in \mathbb{R}}$ gets us the complete line.

Using our definition of a vector as "Tip - Tail" = ${P - Q}$, we can understand a parametric line as a scaled vector, or:
${
    L(t) = Q + t(V); t \in \mathbb{R}
}$

When examining two of such lines, ${L_1(t)}$ and ${L_2(t)}$, we can apply our vector knowledge to discern that:

- ${L_1(t) \parallel L_2(t) \iff V_1(t) \parallel V_2(t)}$ and we have 1 non-shared point.
- ${L_1(t) = L_2(t) \iff V_1(t) \parallel V_2(t)}$ and we have 1 shared point.
- ${L_1(t) // L_2(t) \iff V_1(t) \ne \parallel V_2(t)}$ and ${L_1(t) = L_2(t); \nexists}$.
- ${L_1(t) \perp L_2(t) \iff V_1(t) \perp V_2(t)}$ and we have 1 shared point.

To convert these lines into rectangular functions, simply group them into ${(X(t), Y(t), Z(t))}$ and solve each system for ${t}$. Set them equal to one another to get the final equation.

### The Dot Product

The dot product is a vector operation. If it is positive, it means that the vectors have components in the direction of one another. If it is negative, it means that the vectors' components in the direction of one another are antiparallel.

#### Algebraic Formula

${X \cdot Y = X_1 Y_1 + X_2 Y_2 + ... + X_n Y_n}$

Using this formula, we can actually understand that the magnitude of a vector is just the square root of the dot product with itself. In other words:

${|X| = \sqrt{X \cdot X} = \sqrt{X_1^2+X_2^2+...+X_n^2}}$

#### Geometric Formula

${X \cdot Y = |X| |Y| cos(\theta)}$ where ${\theta}$ is the angle between  the two vectors.

Because ${cos(90)}$ = 0, when the dot product of any 2 vectors (since they have a nonzero magnitude) is 0, we know they are orthogonal.

### The Unit Vector

The Unit Vector has a magnitude of 1. It exists to serve as a direction vector. To normalize any vector into a unit vector, simply divide it by its magnitude.

${U_v = \frac{V}{|V|}}$

### Distance Formula

To find the distance between 2 points ${P}$ and ${Q}$ in any ${n}$ dimensions, find the length of the vector they define.

${distance = \sqrt{(P -Q) \cdot (P - Q)}}$

${distance = |P-Q|}$

### Vector Projection

To find out if one vector is in the direction of the other, use the following formula:

${X_{pushOnY} = \frac{X \cdot Y}{Y \cdot Y}Y}$

The dot product can give us a clue about the sign of this calculation, ${X \cdot Y > 0 \iff +}$  and ${X \cdot Y < 0 \iff -}$

To represent projection graphically:

1. Draw both vectors with their tails at the origin

2. Temporarily extend both vectors via a dashed line

3. Draw a dashed line dropping down from the tip of ${X}$ onto ${Y}$ (you may need to do this from the dashed line you just drew) such that it intersects Y perpendicularly (draw the right angle)
   
   - This represents ${X_{normY}}$

4. Bold in the line that runs along ${X}$ up until you reach the dropped line from (3)
   
   - This represents ${X_{tanY}}$

5. Erase the lines from (2)

If you could make the right triangle without resorting to the antiparallel component of ${Y}$, the dot product was positive because the only way this would be possible is if the angle between the two is less than 90. If not, you can see that the dot product would be negative, which is why you had to use the antiparallel component to ${Y}$.

### Position, Velocity, and Acceleration

Let ${P(t)}$ be a parametrically defined function with appropriate bounds. Then:

${Velocity = Direction * Speed = P'(t) = (x'(t), y'(t))}$

${Speed = |Velocity| = \sqrt{P'(t) \cdot P'(t)}}$

${Direction = Velocity_{normalized} = \frac{P'(t)}{Speed}}$

${Acceleration = P''(t) = (x''(t), y''(t))}$

The component of acceleration in the direction of motion is just the projection of acceleration onto velocity. 

${Acceleration_{tangent}(t) = \frac{a(t) \cdot v(t)}{v(t) \cdot v(t)}v(t)}$

The component of acceleration normal to the direction of motion (pointed inwards on an ellipse) is just the total acceleration minus the tangential component.

${Acceleration_{normal}(t) = a(t) - a_{tan}(t)}$

## Planes

---

### Planes and Normal Vectors

Previous knowledge tells us that planes are defined by 3 non-colinear points, which we  can call ${P}$, ${Q}$, and ${R}$.

Let us define 2 vectors, ${V}$ and ${W}$ such that ${V = Q - P}$ and ${W = R-P}$.

These two vectors live on the plane, and we can take differnt combinations of them in order to parametrize it. 

Using ${P}$ as our initial point to get onto the plane, we can see that it is represented parametrically as:

${M(s, t) = P + sV + tW; (s, t) \in \mathbb{R}}$

Expressing this plane in an ${XYZ}$ equation is done in a different manner. We want to find our normal vector, which is a vector defined as:

 ${Normal \perp PlaneVector, \forall : PlaneVector \in PlaneVectors}$

In other words, this normal vector is perpendicular to all vectors that live on the plane. To find this, we can find the vector ${\perp}$ to both ${V}$ and ${W}$. This can be done by crossing the two vectors:

${Normal = N = V \times W}$

Once again using ${P}$ as our initial point on the plane, we can see that it is represented rectangularly as:

${N_x(x-P_x) + N_y(x-P_y) + N_z(z-P_z) = 0}$

Problems may ask you to factor this out to get something in the form:

${Ax + By + Cz = D}$

This is because, for any plane, this form will always end up the same regardless of what vectors and point you used whereas the former will not. In this case, ${N = (A, B, C)}$.

If you ever need points on a plane and are given either definition, simply plug in any values you want to make the equation work. For the parametric equation, choose your own times to get back a point. For the rectangular equation, choose 2 variables and solve for the third one (that ordered triplet will be your point).

If you have the option regarding how to represent a plane:

- Given 2 vectors on the plane, parametrize it.

- Given a normal vector, use the rectangular formula.

### Intersecting Planes

Unlike lines, planes cannot be skew. Therefore, the only relations between two planes, ${plane_1}$ and ${plane_2}$ are as follows:

- ${plane_1 \parallel plane_2 \iff n_1 \parallel n_2}$ and we have 1 non-shared point.

- ${plane_1 = plane_2 \iff n_1 \parallel n_2}$ and we have 1 shared point.

- ${plane_1}$ intersects ${plane_2}$ ${\iff n_1 \neq \parallel n_2}$

- ${plane_1 \perp plane_2 \iff n_1 \cdot n_2 = 0}$

### The Cross Product

The Cross product is a function that, unlike the dot product, takes in two vectors and **returns a vector**. The resultant is guarenteed to be orthogonal to **both** input vectors.

#### Algebraic Cross Product

We use the determinant of a 3 by 3 matrix to represent the Cross Product algebraically. Given two vectors ${V}$ and ${W}$:

${V \times W = \begin{vmatrix}i & j & k\\ V_1 & V_2 & V_3\\ W_1 & W_2 & W_3 \end{vmatrix}}$

This boils down to ${V \times W = (V_2 W_3 - V_3 W_2, V_3 W_1 - V_1 W_3, V_1 W_2 - V_2 W_1)}$

#### Geometric Cross Product

Given two vectors ${V}$ and ${W}$:

${V \times W = |V| |W| sin(\theta)}$ where ${\theta}$ is the angle between ${V}$ and ${W}$.

From this, we also know that:

${V \times W = -(W \times V)}$

${V \times V = (0, 0, 0)}$

${V \times W = 1 \iff |V| = 1, |W| = 1}$ (this is useful for binormals)

### Reparametrizing with an Orthonormal Basis

The orthonormal basis lets us draw curves on different planes.

Say we have a parametrically defined curve ${P(t) = (x(t), y(t)); 0 \leq t \leq 2\pi}$ and a plane given by ${Ax + By + Cz = D}$ and we want to draw this curve on the plane.

When we want to draw on the ${XY, YZ, XZ}$ planes, we use special perpendicular unit vectors called ${i = (1, 0, 0)}$, ${j = (0, 1, 0)}$ and ${k = (0, 0, 1)}$. We can actually just represent our curve as ${P(t) = x(t)i + y(t)j; 0 \leq t \leq 2\pi}$. To draw on our custom plane, we need to find 2 perpendicular unit vectors on them - this is called our **orthonormal basis**.

Using your plane equation, guess-and-check (by plugging in) 3 points on the plane - we'll call them ${P}$, ${Q}$, and ${R}$. Get a vector on the plane with ${V = Q - P}$.  Now, we want to cross it with the normal vector ${N = (A, B, C)}$ to get a perpendicular vector to ${V}$ that lies on the plane (since ${N}$ is orthogonal to all vectors on the plane). Let ${W = V \times N}$.

Now we have two perpendicular vectors on the plane. To make them unit vectors, we can normalize them to get ${u_1 = |V|}$ and ${u_2 = |W|}$. Given a point to center at (which lies on the plane) ${C}$, we can now reparametrize this curve onto the plane using our orthonormal basis:

${M(t) = C + x(t)u_1 + y(t)u_2;0 \leq t \leq 2\pi}$ 

### Line of Intersection between 2 Planes

Let ${plane_1}$ and ${plane_2}$ be 2 planes given in the form ${Ax + By + Cz = D}$ with nonparallel unit vectors (this means they intersect along a line).

To find the line of intersection between them:

1. Add the planes to eliminate a variable
   
   - You might have to use a bit of algebra to scale one of the equations in order for this to work

2. Solve for a variable in this equation

3. Choose a value that satisfies this function (this gives you 2 variables) and plug both variables into either plane equation to get a third

4. You now have one of the points along the line of intersection (shared by both planes)

5. To find the spanning vector for this line, you know that it lives on both ${plane_1}$ and ${plane_2}$, which means it will be perpendicular to each of their normal vectors, use the cross product to get ${V = N_1 \times N_2}$

6. Using the equation for a parametric line, plug in our values to get ${L(t) = P + tV;t\in \mathbb{R}}$

### Partial Derivatives & Tangent Planes

Given a function ${f(n_1, n_2, ..., n)}$, we can measure the change with respect to one variable with a partial derivative.

To compute ${\frac{\partial f}{\partial n_k}}$, differentiate under the idea that the only variable in the function is ${n_k}$ and every other ${n}$ is a constant.

If ${z = f(x, y)}$ is the equation for a surface, then the tangent plane at the point ${(a, b, f(a, b))}$ is ${z = f_x(a, b)(x-a) + f_y(a, b)(y-b)+f(a, b)}$

This has the normal vector ${N = (-f_x(a, b), -f_y(a, b), 1)}$

### Tubes & "The Normals"

Given a function ${P(t)}$ with appropriate bounds, here are all the "normals" you need to know (along with the unit tangent):

| Name                            | Formula                                         | Description                                                                                                                                                                   |
|:-------------------------------:|:-----------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit Tangent                    | ${\frac{{P'(t)}}{\|P'(t)\|}}$                   | The "velocity vector" for ${P(t)}$.                                                                                                                                           |
| Main Unit Normal                | ${\frac{utan'(t)}{\|utan'(t)\|}}$               | What keeps the function going around a curve. Always points in towards the concavity of ${P(t)}$.                                                                             |
| Right Footed Unit Normal        | ${\frac{(y'(t), -x'(t))}{\|(y'(t), -x'(t))\|}}$ | Always points to the right of the Unit Tangent (towards your right foot). If ${P(t)}$?goes counterclockwise it points outwards, if ${P(t)}$?goes clockwise it points inwards. |
| Binormal (always a unit normal) | ${MUN \times utan}$                             | A vector perpendicular to both the ${MainUnitNormal}$?and ${UnitTangent}$.                                                                                                    |

To create tubes, first realize that we can define a perpendicular plane to our curve at any time ${t}$ with: 

${plane(t, u, v) = P(t) + u*mainUnitNormal(t) + v*binormal(t); t_l \leq t \leq t_h, (u, v) \in \mathbb{R}}$

Because ${mainUnitNormal}$ and ${binormal}$ are perpendicular unit vectors, we can use them for our orthonormal basis to draw our circles. So our tube is just:

${tube(t, s) = P(t) + cos(s)*mainUnitNormal(t) + sin(s)*binormal(t); t_l \leq t \leq t_h, s \in \mathbb{R}}$

## The Gradient

---

### The Gradient Vector

For a function ${f}$ of ${n}$ variables, we know there exist ${n}$ first derivatives, called partial derivatives for ${n > 1}$. The gradient of ${f}$, ${\nabla f}$ simply aggregates all of these into one place, such that ${\nabla f = (\frac{\partial f}{\partial n_1}, \frac{\partial f}{\partial n_2}, ..., \frac{\partial f}{\partial n})}$.

Because a partial derivative tells us how changing a variable changes the function, and more importantly by what degree, the gradient can be seen as a **weighted** calculation representing the direction of the greatest *initial* increase of ${f}$.

Keep in mind that the gradient changes when you move to a new point, so the vector it returns is only good for your first step.

### Chain Rule and Level Curves/Surfaces

Given a function ${z = f(x, y)}$, we can understand a level curve as when we set our "height" to some fixed value. In other words, ${levelCurve = k = f(x, y); k \in \mathbb{R}}$.

- We can visualize this by thinking of ${z = f(x, y)}$ as a mountain, where `z` is your height at any coordinate ${(x, y)}$.  Then, the level curve is like a map of where we'd need to walk to stay with a height `k`.

Given a function ${w = f(x, y, z)}$, we can understand a level surface as when we set `w` to some fixed value. In other words, ${levelSurface = k = f(x, y, z); k \in \mathbb{R}}$.

- We can visualize this by thinking of ${w = f(x, y, z)}$ as the temperature of a pool, where `w` is your temperature at any coordinate ${(x, y, z)}$. Then, the level surface is looking for all the points where we have a temperature of `k`.

To differentiate a function ${f}$ that takes in any ${n \geq 1}$ parameters, multiply the derivative of the enclosing function (${\nabla f; \forall: n >1}$) by the derivative of each of the ${n}$ parameters. 

So, ${\frac{df}{dt} = \nabla f(n_1(t), n_2(t), ..., n(t)) \cdot (n_1'(t), n_2'(t), ..., n'(t))}$

*Note: to compute the gradient, do everything ignoring the parametric parameters, and after you've computed it, simply sub in the parametric definitions.*

You can see how, by having your "motion" be in the direction of the gradient, the function increases (by Geometric Dot Product formula). Likewise, going against the gradient decreases the function.

#### Why ${\nabla f \perp levelCurves/Surfaces}$

Assume the level curve for the function ${z = f(x, y)}$ given by ${k = f(x, y)}$. Let the parameterization for ${f}$ be given as ${(x(t), y(t))}$.

A tangent vector to our level curve is given by ${(x'(t), y'(t))}$. Checking how this tangent vector relates to the gradient can be done by setting up the Chain Rule as follows:

${\frac{df(x(t), y(t))}{dt} = \nabla f(x(t), y(t)) \cdot (x'(t), y'(t))}$

Subsitute in ${(x(t), y(t)) = k}$ on the left side of the equation:

${= \frac{d(k)}{dt}}$

The derivative of a constant is 0 so:

${= 0}$

Therefore, we know that the gradient is orthogonal to all level curves/surfaces (by Geometric Dot Product formula).

### The Hessian and Classifying Critical Points

In single variable calculus, we used the first derivative test to find out where we had "flat spots" on our curve, when then became our candidates. The two dimensional analogue of this is finding out where the tangent plane is "flat", which just means that it is fixed to some constant ${Z}$. We can identify these points because they have a ${\nabla f}$ = 0, since the gradient vanishes.

After getting our candidates from solving ${\nabla f = 0}$, we can now classify them. In single variable calculus, this was done with the second derivative test. The two dimensional analogue of this is finding the determinant of the Hessian matrix, which is defined as:

${Hessian = D(x, y) = \begin{vmatrix} f_{xx}(x, y) & f_{xy}(x, y)\\ f_{yx}(x, y) & f_{yy}(x, y) \end{vmatrix}}$

Use the following table to classify the points:

| ${D(x, y)}$ | ${f_{xx}(x, y)}$ | Classification                                                        |
|:-----------:|:----------------:| --------------------------------------------------------------------- |
| +           | +                | "Positive Second Derivative", so "Concave Up", so? **Local Minima**   |
| +           | -                | "Negative Second Derivative", so "Concave Down", so? **Local Maxima** |
| -           | n/a              | **Saddle Point**                                                      |
| 0           | n/a              | Inconclusive.                                                         |

### LaGrange Multipliers

Maximizing ${z = f(x, y)}$ given a constraint ${g(x, y) = c}$ can be done by solving the following system:

${\nabla f(x, y) = \lambda \nabla g(x, y)}$

Solve for ${\lambda}$ for the ${X}$ and ${Y}$ components. Then set the two equations for ${\lambda }$ equal to one another to solve for ${x}$ and ${y}$. Then, test candidates in ${f}$ to classify them.

### Classifying End Behavior and Global Extrema

Given a function ${f(x, y)}$, how can you explain its global extrema?

First, understand the following relative growth rates (from slowest to fastest):

| ${\frac{1}{x}}$ |
|:---------------:|
| ${log(x)}$      |
| ${\sqrt{x}}$    |
| ${x}$           |
| ${x^a}$         |
| ${a^x}$         |
| ${x!}$          |
| ${x^x}$         |

Now, proceed as follows:

1. Try picking a "path" along ${f}$ to send it to ${\pm \infty}$.
   
   - If you send it to ${\infty}$, there can be no biggest crest (global maxima).
   
   - If you send it to ${-\infty}$, there can be no deepest dip (global minima).

2. To prove existence of extrema, use the following general explanation:
   
   - *Notice that ${f(x, y) \le 0; f(x, y) \ge 0}$ near the origin. As it escapes the origin (when ${|x|}$ and ${|y|}$ get large), the dominant terms {greatest growth rate function here} cause ${f}$ to tend to 0 {or whatever other constant}. Therefore, we have a biggest crest and deepest dip {modify to fit as appropriate}.*

## Gauss Green and Double Integrals

---

### The 2D Integral

Signed volume, that is, volume above the ${XY}$ plane minus volume below, for a function ${f(x,y)}$ over a region ${R}$  is represented by the double integral ${\iint_R f(x, y) \,dA}$.

You can evaluate this in two ways, ${dx\,dy}$ (which accumulates volume by sweeping out horizontal cross sections), or ${dy\,dx}$ (which accumulates volume by sweeping out vertical cross sections). Consider these integrals the analogue of partial derivatives, you hold all the variables that you aren't integrating with respect to constant and compute the integral as usual.

Order here matters, you evalute the inner integral first and then the outer one.

When to use what (non rectangular regions)?

| ${R}$ with a left and right curve | ${R}$ with a high and low curve | ${R}$ defined parametrically |
|:---------------------------------:|:-------------------------------:|:----------------------------:|
| ${dx\,dy}$                        | ${dy\,dx}$                      | Gauss Green                  |

### Gauss Green Formula

#### Formula

${\iint_R \frac{\partial n}{\partial x} - \frac{\partial m}{\partial y} ,dA = \int_{t_{low}}^{t_{high}} n(x(t), y(t)) \,y'(t) + m(x(t), y(t)) \,x'(t) \,dt}$

Conditions:

1. The parametrization of ${R = (x(t), y(t))}$ is counterclockwise.

2. ${R = (x(t), y(t))}$ is a simple, closed curve.

3. ${t_{low} \leq t \leq t_{high}}$ brings you around ${R}$ exactly once.

#### How we use it

Given a function ${f(x, y)}$, and a region R with the parametrization ${R = (x(t), y(t)); t_{low} \leq t \leq t_{high}}$ matching the conditions of the Gauss Green formula:

Let ${m(x, y) = 0}$ and ${n(x, y) = \int_{0}^{x} f(s, y) \,ds}$.

Then, by Gauss Green,  ${\iint_R f(x, y) \,dA = \int_{t_{low}}^{t_{high}} n(x(t), y(t))\, y'(t) \,dt}.$

### Area, Average Value, and Centroids

The area of ${R}$ is just ${Area_R = \iint_R 1 \,dA}$.

The average value of ${f(x, y)}$ over a region ${R}$  is ${AverageValue_f = \frac{\iint_R f(x, y) ,dA}{\iint_R 1 \,dA}}$.

The centroid of ${f(x, y)}$ over a uniform region ${R}$ with is ${Centroid_f = (\frac{\iint_R x \,dA}{\iint_R 1 \,dA}, \frac{\iint_R y \,dA}{\iint_R 1 \,dA})}$.

The centroid of ${f(x, y)}$ over a region ${R}$ with density (given by ${d(x, y)}$) is

${Centroid_f = (\frac{\iint_R x\,d(x, y) \,dA}{\iint_R d(x,y) \,dA}, \frac{\iint_R y\,d(x,y) \,dA}{\iint_R d(x,y) \,dA})}$.



## Vector Fields

### What is it?

Looks like a gradient field, but isn't guaranteed to come from a surface. Think of it as a body of water with currents/whirpool. It is defined to be the assignment of one vector to each point in the plane. For every ${(X, Y)}$ in the plane, there is a vector associated with it given by ${(m(x, y), n(x, y))}$.



To classify a vector field as a gradient field, you can't have any ${(x, y)}$ s.t. ${Field = (m(x, y), n(x, y))\,\nexists}$.



${SlopeFields \subset VectorFields \,\&\, GradientFields \subset VectorFields}$

## How do I make one?

Given a function ${(x, y) = (m(x, y), n(x, y))}$ plot the vectors on a Cartesian plane.

### Notable Points

Assume a ${Field}$ representing a surface ${z = f(x, y)}$.

A point with all neighboring vectors pointing towards it is called a **sink** (local maximum). 

A point with all neighboring vectors point away from it is called a **source** (local minimum).

## Trajectories

If you dropped a pebble in this body of water, how would it travel? A trajectory is a path ${x(t), y(t)}$ such that tangent vectors to the path are the field vectors ${(x'(t), y'(t) = Field(x(t), y(t)))}$.



We tend to think globally, so when we want to go to a max we'd instinctively go in a straight line. However, a gradient field will follow the direction of greatest initial increase, meaning that we might not get the most efficent path towards a max.



Euler's Method is useful for finding exact solutions to Differential Equations, but these trajectories are a great *approximation* - especially for the ones that can't be solved.

### How does it relate to a slope field?

Modeling a differential equation as a vector field:

${ \frac{dy}{dx} = \frac{\Delta Y}{\Delta X} = \frac{y-x}{1} \therefore (\Delta X, \Delta Y) = (1, y-x)}$



When doing this conversion, you might not get a nice looking vector field. To solve this:

1. Normalize the vectors ${V \to U_V}$

2. Scale them down by a constant factor ${U_V \to \lambda \, U_V \iff \lambda \in \mathbb{R}}$
   
   - Use guess and check to find ${\lambda}$



### Vector Fields Acting on a Curve

Given a vector field ${Field = (m(x, y), n(x, y))}$ and a curve ${(x(t), y(t)); t_{low} \leq t \leq t_{high}}$.



You only really need the vectors that are impacting the particle, so plot the parts of the field with their tails on the curve. This can be expressed as: 

${SubField \subset Field = (m(x(t), y(t), n(x(t), y(t))))}$.



These field vectors can either push you forward/backward or push you left/right on the curve. We can understand these as:

| Name                  | Description                                                                                                                                                                                                              | Formula                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- |
| Forward/Backward Push | The push of the field vector in the direction of the tangent vector to the curve. *The net flow of the vector field **along** the curve* (is either counterclockwise, clockwise; can also balance out to 0).             | ${\frac{Field(x(t), y(t)) \cdot (x'(t), y'(t))}{\|(x'(t), y'(t))\|}(x'(t), y'(t))}$     |
| Left/Right Push       | The push of the field vector in the direction of the vector normal to the curve. *The net flow of the vector field **across** the curve*. (is either inside to outside vs. outside to inside; can also balance out to 0) | $${\frac{Field(x(t), y(t)) \cdot (y'(t), -x'(t))}{\|(y'(t), -x'(t))\|}(y'(t), -x'(t))}$ |

Note that from here on out, we only really use the right footed normal vector (${(y(t), -x'(t))}$).